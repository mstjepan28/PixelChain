<template>
<div class="PageContent">
    <ImageModal @closePopup="closePopup" :info="selectedImage"/>

    <div>
        <hr class="PurpleLine"/> <InfoBox :info="Gallery"/> <hr class="PurpleLine"/>
    </div>

    <div class="optionsBar">
        <input class="inputBox" type="text" v-model="searchInput" placeholder="Search...">
        
        <Sorting class="sorting" @sort="sortItems">
            <div class="filterItem">
                <input id="name" type="radio" v-model="sortValues" name="sortValues" :value="{atr: 'name', type: 'string'}"> 
                <label for="name"> Name </label>
            </div>
            <div class="filterItem">
                <input id="career" type="radio" v-model="sortValues" name="sortValues" :value="{atr: 'career', type: 'number'}">
                <label for="career"> Career </label>
            </div>
        </Sorting>

        <div></div>
    </div>
    <div class="pageContent" v-if="images">
        <div class="images">
            <img @click="openPopup(img)" :key="img.imgSrc" :src="img.imgSrc" v-for="img in images"/>
        </div>
    </div>
</div>
</template>

<script>
import InfoBox from '@/components/InfoBox';
import Sorting from '@/components/Sorting';
import ImageModal from '@/components/imageModal';

import store from '@/store.js';

export default {
    components:{
        InfoBox,
        Sorting,
        ImageModal,
    },
    data(){
        return{
            searchInput: '',
            Gallery: { title: "Gallery", text: store.placeholderText },

            images: {
                col3: false
            },
            selectedImage: false,
            sortValues: false
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
        
        // Sorting --------------------------------------------------------------------------------
		sortItems(sortOrder){
			if(!this.sortValues) return;
			this.store.sort_items(this.sortValues, sortOrder, "images");

			this.getProjects();
        },

        // Image setup ----------------------------------------------------------------------------
        getImages(){
            this.images = store.images;
        },
    },
    mounted(){
        this.getImages();
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/ContentPage.scss";
@import "@/styles/imageGrid.scss";

img{
    cursor: pointer;
}
</style>