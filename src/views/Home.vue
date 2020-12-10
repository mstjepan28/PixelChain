<template>
<div class="home">
	<HeaderCarousel :info="headerInfo"/>
	
	<div class="section">
		<hr class="PurpleLine"/><InfoBox :info="{title:'Artists', text:placeholderText}"/><hr class="PurpleLine"/>
		
		<div class="sectionContent">
			<Card :key="card.id" v-for="card in users.slice(0,3)">
				<User :info="card"/>
			</Card>
		</div>
	</div>
	
	<div class="section">
		<hr class="PurpleLine"/><InfoBox :info="{title:'Images', text:placeholderText}"/><hr class="PurpleLine"/>
		<div class="sectionContent">
			<img class="previewImage" :key="imgUrl" :src="imgUrl" v-for="imgUrl in previewImages"/>
		</div>
	</div>
</div>
</template>

<script>
import HeaderCarousel from '../components/HeaderCarousel.vue';
import InfoBox from '@/components/InfoBox';
import Card from '@/components/Card';
import User from '@/components/User';

import store from '@/store.js';
import testData from '@/TestData.js';

export default {
	components: {
		HeaderCarousel,
		InfoBox,
		User,
		Card
	},

	data(){
		return{
			store,
			previewImages: false,

			users: testData.users,
			headerInfo: testData.headerProps,
			placeholderText: testData.placeholderText
		}
	},
	methods:{

	},
	mounted(){
		this.previewImages = testData.getImgUrls().slice(0,3)
	},
	name: 'Home'
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
