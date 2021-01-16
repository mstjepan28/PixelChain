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
			<img class="previewImage" @click="openPopup(img)" :key="img" :src="img" v-for="img in images"/>
		</div>
		<div v-else-if="isLoading" class="loadingImages">
			<h3>Loading images...</h3>
			<img src="../assets/loading.gif"/>
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
			selectedImage: false,
			images: store.images,
			headerInfo: store.headerProps,
			users: false,
			isLoading: true,
			placeholderText: store.placeholderText,
		}
	},
	computed: {
        ...mapGetters("drizzle", ["drizzleInstance"]),
    },
	methods:{
		// Popup ----------------------------------------------------------------------------------
		openPopup(img){
			this.selectedImage = img;

			let popupStyle = document.getElementById("imagePopup").style;

			document.documentElement.style.overflow = 'hidden'
			popupStyle.display = 'flex'
		},
		closePopup(){
			let popupStyle = document.getElementById("imagePopup").style;

			document.documentElement.style.overflow = 'auto'
			popupStyle.display = 'none';
		},

		// Images ---------------------------------------------------------------------------------
		getImages(){
			this.images = store.images.slice(0,3);
			this.isLoading = store.isLoading;
		},
		getUsers(){
			this.users = store.users.slice(0,4);
		},

		// GET IMAGES -----------------------------------------------------------------------------
		async checkState(state){
			while(!state.drizzleStatus.initialized){
				const delay = new Promise(resolve => setTimeout(resolve, 500));
				await delay;

				state = this.drizzleInstance.store.getState();
			}
		},

		async fetchImages(){
			const result = await this.drizzleInstance.contracts.IPFSImageStore.methods.get().call();
			console.log("res:", result)

			const imgCidArray = result.split(",");
			return imgCidArray.map(async url => {
				const img = await fetch(`https://gateway.ipfs.io/ipfs/${url}/`);
				return img.text();
			});
		},
	},

	async mounted(){
		const state = this.drizzleInstance.store.getState();
		await this.checkState(state)
		
		let promises = await this.fetchImages();
		console.log(promises)

		Promise.all(promises).then(results => {
			results.forEach(r => {
				console.log(r);
				store.images.push(r);
			})

			console.log("loading finished")

			this.isLoading = false;
			this.getImages();
		});
		
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
