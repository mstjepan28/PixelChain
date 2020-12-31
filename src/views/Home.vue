<template>
<div class="home">
	<ImageModal @closePopup="closePopup" :info="selectedImage"/>

	<HeaderCarousel :info="headerInfo"/>
	
	<div class="section">
		<hr class="PurpleLine"/><InfoBox :info="{title:'Artists', text:placeholderText}"/><hr class="PurpleLine"/>
		
		<div class="sectionContent">
			<UserCard :key="card.id" :info="card" v-for="card in users.slice(0,3)"/>
		</div>
	</div>
	
	<div class="section">
		<hr class="PurpleLine"/><InfoBox :info="{title:'Images', text:placeholderText}"/><hr class="PurpleLine"/>
		
		<div class="sectionContent">
			<img class="previewImage" @click="openPopup(img)" :key="img.imgSrc" :src="img.imgSrc" v-for="img in imageList"/>
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
import testData from '@/TestData.js';

export default {
	components: {
		HeaderCarousel,
		InfoBox,
		UserCard,
		ImageModal
	},

	data(){
		return{
			imageList: false,
			selectedImage: false,

			headerInfo: store.headerProps,

			users: testData.users,
			placeholderText: testData.placeholderText
		}
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
			const images = testData.images;

			store.imageList = images;
			this.imageList = images.slice(0,3);
		},
		getUsers(){
			const users = testData.users;

			store.userList = users;
			this.users = users;
		}
	},
	mounted(){
		testData.generateTestData();
		this.getImages();
		this.getUsers();
	}
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
