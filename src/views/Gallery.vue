<template>
<div>
    <ImageModal @closePopup="closePopup" :info="selectedImage"/>

	<div class="PageContent" style="padding-top: 5rem">
		<div>
			<hr class="PurpleLine"/> <InfoBox :info="Gallery"/> <hr class="PurpleLine"/>
		</div>

		<div class="optionsBar">
			<input class="inputBox" type="text" v-model="searchInput" placeholder="Search..." @keyup="search">
		</div>

		<div v-if="images" class="pageContent">
			<div class="images">
				<img @click="openPopup(img)" :key="img.id" :src="img.imgSrc" v-for="img in images"/>
			</div>
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
            cidList: false,

            isLoading: true,

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
        search(){
            this.images = store.images.filter( img => Object.keys(img).some(atr => 
                new RegExp(this.searchInput).test(img[atr]) 
            ))
        },

        // Getting images -------------------------------------------------------------------------
		setImages(){
			this.images = store.images;
			this.isLoading = false;
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
		async fetchImages(){
			// Dohvati string koji sadrzi sve CID slika sa IPFS-a
			let result = await this.drizzleInstance.contracts.IPFSImageStore.methods.getAllImages().call();
			if(!result) return [];

			// Lista CID-a se sprema da bi kasnije mogli odredeni spojiti sa slikom
			this.cidList = result;
			console.log(result);
			// Return array promis-a koji ce se resolvati u slike
			return result.map(async url => {
				if(url.cid === "CopyRight"){
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
	/*
    watch:{
        searchInput(){ 
            // Ako se promjenio searchInput, provjeri sljedeci uvjet
            // Ako searchInput nije prazan, proslijedi ga u funkciju search(), u suprotnome
            // dohvati pozovi funkciju getImages() i dohvati sve slike
            this.searchInput.length? this.search(this.searchInput): this.getImages();
        }
    },
	*/
}
</script>

<style lang="scss" scoped>
@import "@/styles/ContentPage.scss";
@import "@/styles/imageGrid.scss";
</style>