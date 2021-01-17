<template>
<div class="PageContent">
    <ImageModal @closePopup="closePopup" :info="selectedImage"/>

    <div>
        <hr class="PurpleLine"/> <InfoBox :info="Gallery"/> <hr class="PurpleLine"/>
    </div>

    <div class="optionsBar">
        <input class="inputBox" type="text" v-model="searchInput" placeholder="Search...">
    </div>

    <div class="pageContent" v-if="images">
        <div class="images">
            <img @click="openPopup(img)" :key="img.id" :src="img.imgSrc" v-for="img in images"/>
        </div>
    </div>
</div>
</template>

<script>
import InfoBox from '@/components/InfoBox';
import ImageModal from '@/components/imageModal';

import store from '@/store.js';

export default {
    components:{ InfoBox, ImageModal },
    data(){
        return{
            searchInput: '',
            Gallery: { title: "Gallery", text: store.placeholderText },

            images: false,
            selectedImage: false,
            sortValues: false
        }
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
        
        // Search ---------------------------------------------------------------------------------
        search(keyword){
            this.images = this.images.filter( img => Object.keys(img).some(atr => 
                new RegExp(keyword).test(img[atr]) 
            ))
        },

        // Image setup ----------------------------------------------------------------------------
        getImages(){
            this.images = store.images;
        },
    },
    mounted(){
        this.getImages();
    },
    watch:{
        searchInput(){ 
            // Ako se promjenio searchInput, provjeri sljedeci uvjet
            // Ako searchInput nije prazan, proslijedi ga u funkciju search(), u suprotnome
            // dohvati pozovi funkciju getImages() i dohvati sve slike
            this.searchInput.length? this.search(this.searchInput): this.getImages();
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/styles/ContentPage.scss";
@import "@/styles/imageGrid.scss";
</style>