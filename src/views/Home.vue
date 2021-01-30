<template>
<div class="home">
	<ImageModal @closePopup="closePopup" :info="selectedImage"/>

	<HeaderCarousel :info="headerInfo"/>
	
	<div class="section">
		<hr class="PurpleLine"/><InfoBox :info="{title:'Artists', text:placeholderText}"/><hr class="PurpleLine"/>
		<div v-if="users" class="sectionContent">
			<UserCard :key="card.id" :info="card" v-for="card in users.slice(0,3)"/>
		</div>
	</div>
	
	<div class="section">
		<hr class="PurpleLine"/><InfoBox :info="{title:'Images', text:placeholderText}"/><hr class="PurpleLine"/>
		
		<div v-if="images" class="sectionContent">
			<img class="previewImage" @click="openPopup(img)" :key="img + '' + Math.random()" :src="img.imgSrc" v-for="img in images"/>
		</div>
		<div v-else-if="isLoading" class="loadingImages">
			<h3>Loading images...</h3>
			<img src="../assets/loading.gif"/>
		</div>
		<div v-else class="loadingImages">
			<h3>No images to show... :(</h3>
		</div>
	</div>
</div>
</template>

<script>

import HeaderCarousel from '../components/HeaderCarousel.vue';
import InfoBox from '@/components/InfoBox';
import UserCard from '@/components/UserCard';
import ImageModal from '@/components/imageModal';

import store from '@/store.js';
import { mapGetters } from "vuex";

export default {
	components: {
		HeaderCarousel,
		InfoBox,
		UserCard,
		ImageModal
	},
	data(){
		return{
			images: false,
			users: false,
			
			selectedImage: false,
			cidList: [],
			
			isLoading: true,

			headerInfo: store.headerProps,
			placeholderText: store.placeholderText,
		}
	},
	computed: {
        ...mapGetters("drizzle", ["drizzleInstance"]),
    },
	methods:{
		// Popup ----------------------------------------------------------------------------------
		openPopup(img){
			this.selectedImage = img; // Odabrana slika se postavlja kao selectedImage

			let popupStyle = document.getElementById("imagePopup").style; // Dohvati stil elementa

			document.documentElement.style.overflow = 'hidden'; // Onemoguci scroll
			popupStyle.display = 'flex'; // Prikazi popup
		},
		closePopup(){
			let popupStyle = document.getElementById("imagePopup").style; // Dohvati stil elementa

			document.documentElement.style.overflow = 'auto' // Omoguci scroll
			popupStyle.display = 'none'; // Sakri popup
		},

		// Setting data ---------------------------------------------------------------------------
		// Dohvati 3 slike iz store.images te loading postavi na false
		setImages(){
			this.images = store.images.slice(0,3);
			console.log(this.images);
			this.isLoading = false;
		},
		getUsers(){
			this.users = store.users.slice(0,4);
		},

		// Getting data ---------------------------------------------------------------------------
		async checkState(){
			// Dohvati trenutno stanje inicijalizacije drizzle
			let state = this.drizzleInstance.store.getState();

			// Ako drizzle nije inicijaliziran, pricekaj 500ms i ponovno provjeri. Petlja se izvrsava
			// sve dok se drizzle ne inicijalizira
			while(!state.drizzleStatus.initialized){
				const delay = new Promise(resolve => setTimeout(resolve, 500));
				await delay;

				state = this.drizzleInstance.store.getState();
			}
		},

		async fetchImages(){
			// Dohvati string koji sadrzi sve CID slika sa IPFS-a
			const result = await this.drizzleInstance.contracts.IPFSImageStore.methods.get().call();
			if(!result) return [];

			// Lista CID-a se sprema da bi kasnije mogli odredeni spojiti sa slikom
			this.cidList = result;
			
			// Return array promis-a koji ce se resolvati u slike
			return result.map(async url => {
				const img = await fetch(`https://gateway.ipfs.io/ipfs/${url}/`); // Fetch sliku sa IPFS-a
				return img.text(); // Dohvati base64URL
			});
		},

		async getImages(){
			// Provjeri ukoliko slike vec postoje u store.images. Ako postoje dohvacaju se iz store.images.
			if(store.images.length){
				this.setImages();
				return;
			}

			// Ako je store.images prazan, dohvati slike sa IPFS-a. Prije dohvacanja slika provjeri i pricekaj
			// inicijalizaciju drizzle-a.
			await this.checkState();

			// Dohvati slike sa IPFS-a		
			let promises = await this.fetchImages();

			// Ukoliko ne postoji niti jedna slika, zavrsi funkciju i okoncaj loading
			if(!promises.length){
				this.isLoading = false;
				return;
			}

			// Resolve promise koji daju JSON u obliku string-a. Taj string se pretvara u objekt i dodaje u store.images
			Promise.all(promises).then(results => {
				results.forEach((promiseResult, index) => {
					const resolvedImg = JSON.parse(promiseResult);

					// Dodaj CID na sliku
					resolvedImg.cid = this.cidList[index];

					store.images.push(resolvedImg)
				});
				this.setImages();
			});
		}
	},

	async mounted(){
		this.getImages();
	},
}
</script>

<style lang="scss" scoped>
.section{
	width: 100%;

	margin-bottom: 6em;

	display: flex;
	flex-direction: column;

	justify-content: center;
	align-content: center;

	.sectionContent{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
}

.cardBody{
	margin: 0 2rem;
}

.previewImage{
	min-height: 80%;
	max-height: 80%;
	width: 30%;

	cursor: pointer;
}

.loadingImages{
	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;

	padding-top: 2rem;
}

@media only screen and (max-width: 600px) {
	.sectionContent{
		flex-wrap: wrap;
	}
	.previewImage{
		width: 90%;
		max-height: 50%;
		min-height: 50%;
	}
}
</style>
