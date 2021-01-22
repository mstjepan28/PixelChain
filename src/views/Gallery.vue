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
import { mapGetters } from "vuex";
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
        
        // Search ---------------------------------------------------------------------------------
        search(keyword){
            this.images = this.images.filter( img => Object.keys(img).some(atr => 
                new RegExp(keyword).test(img[atr]) 
            ))
        },
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
        async getImages(){

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
				results.forEach(promiseResult => {
					const resolvedImg = JSON.parse(promiseResult);
					this.images.push(resolvedImg)
				});
			});
		}
    },
    async mounted(){
        await this.checkState();
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