<template>
<div class="home">
	<ImageModal @closePopup="closePopup" :info="selectedImage"/>

	<HeaderCarousel :info="headerInfo"/>
	
	<div class="section">
		<hr class="PurpleLine"/><InfoBox :info="{title:'Images', text:placeholderText}"/><hr class="PurpleLine"/>
		
		<div v-if="images.length" class="sectionContent">
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

import ImageModal from '@/components/imageModal';

import store from '@/store.js';
import { mapGetters } from "vuex";

export default {
	components: {
		HeaderCarousel,
		InfoBox,
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
			this.images = store.images;
			this.isLoading = false;
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
			let result = await this.drizzleInstance.contracts.IPFSImageStore.methods.get().call();
			if(!result) return [];

			// Lista CID-a se sprema da bi kasnije mogli odredeni spojiti sa slikom
			this.cidList = result;
			console.log(result);
			// Return array promis-a koji ce se resolvati u slike
			return result.map(async url => {
				if(url.cid === "CopyRight" || url.cid === ""){
					return null;
				}else{
					let img = await fetch(`http://127.0.0.1:8080/ipfs/${url.cid}/`); // Fetch sliku sa IPFS-a
					return img.text(); // Dohvati base64URL
				}	
			});
		},

		async getImages(){
			store.images = [];
			
			// Ako je store.images prazan, dohvati slike sa IPFS-a. Prije dohvacanja slika provjeri i pricekaj
			// inicijalizaciju drizzle-a.
			await this.checkState();

			// Dohvati slike sa IPFS-a		
			let promises = await this.fetchImages();
			console.log(promises)

			// Ukoliko ne postoji niti jedna slika, zavrsi funkciju i okoncaj loading
			if(!promises.length){
				this.isLoading = false;
				return;
			}

			// Resolve promise koji daju JSON u obliku string-a. Taj string se pretvara u objekt i dodaje u store.images
			Promise.all(promises).then(results => {
				results.forEach((promiseResult, index) => {
					//const resolvedImg = JSON.parse(promiseResult);

					// Dodaj CID na sliku
					if(promiseResult != null){
						const img = Object.assign({imgSrc: promiseResult}, this.cidList[index]);

						store.images.push(img)
					}	
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
		flex-wrap: wrap;
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

@media only screen and (max-width: 600px) {
	.previewImage{
		width: 90%;
		max-height: 50%;
		min-height: 50%;
	}
}
</style>
