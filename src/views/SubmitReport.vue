<template>
<div class="submitReport">
    <div>
        <hr class="PurpleLine"/> <InfoBox :info="submitReport"/> <hr class="PurpleLine"/>
    </div>

    <div class="reportDescription">
        <textarea v-model="description" class="inputText" placeholder="Describe why you are reporting this image..."></textarea>
    </div> <hr class="PurpleLine"/>

    <div v-if="reportedImage" class="imageContainer">
        <div class="reportedImg">
            <img :src="reportedImage.imgSrc" alt="">
        </div>

        <div v-if="selectedImage" class="reportedImg">
            <div class="removeImageBtn" @click="removeSelectedImage"> <span class="material-icons"> close </span></div>
            <img :src="selectedImage.imgSrc" alt="">
        </div>
        
        <div v-else class="reportedImg" style="overflow: auto">
            <div class="selectPreview" :key="img.imgSrc" :src="img.imgSrc" v-for="img in imageList">
                <img v-if="img.cid != reportedImage.cid" :src="img.imgSrc" @click="selectImage(img)">
            </div>
        </div>
    </div> <hr class="PurpleLine"/>

    <div class="buttonContainer">
        <button class="ButtonDesign2S Red" @click="cancelReport"> Cancel </button>

        <button v-if="report.original_cid" class="ButtonDesign2S LightPurple" @click="sendReport"> Submit report </button>
        <button v-else class="ButtonDesign2S LightGray" disabled> Submit report </button>
    </div> <hr class="PurpleLine"/>
</div>
</template>

<script>

import store from '@/store.js';
import InfoBox from '../components/InfoBox.vue';
import { mapGetters } from "vuex";
export default{
    components: { InfoBox },
    data(){
        return{
            cid: this.$route.params.cid,
            submitReport: {title: "Submit a report", text: store.placeholderText },

            imageList: store.images,

            reportedImage: false,
            selectedImage: false,
            description: "",
            report: {}
        }
    },
    computed: {
		...mapGetters("drizzle", ["drizzleInstance"]),
	},
    methods:{
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
        // Stvori novi report ukoliko je korisnik odabrao sliku
        async sendReport(){
            if(!this.report.original_cid) return;
            this.report.votes = 0;
            await this.checkState();
            console.log("Reported:", this.reportedImage);
            console.log("Original:", this.selectedImage);
            this.drizzleInstance.contracts.IPFSImageStore.methods.addReport.cacheSend(this.selectedImage.cid, this.reportedImage.cid, this.description);

            /*--------------------------------------------------
                    Poziv funckije za dodavanje reporta
            --------------------------------------------------*/
        },
        
        // Korisnik u listi odabire sliku koja se pohranjuje kao this.selectedImage te se njen CID pohranjuje kao reported_CID
        selectImage(image){
            this.selectedImage = image;
            this.report.original_cid = image.cid;
        },

        // Ukloni odabranu sliku
        removeSelectedImage(){
            this.selectedImage = false;
            this.report.original_cid = false;
        },

        // Dohvacanje slike koju korisnik zeli reportati
        getReportedImage(){
            this.reportedImage = store.images.filter(image => image.cid == this.cid)[0];
            this.report.reported_cid = this.cid;
        },

        // Ponisti report i vrati se na Home
        cancelReport(){
            this.report = {};
            this.selectedImage = false;

            this.$router.push({ name: 'Home'})
        }
    },
    mounted(){
        this.getReportedImage();
    }
}
</script>

<style lang="scss" scoped>
.submitReport{
    margin-top: 5rem;
}

.reportDescription{
    width: 100%;

    display: flex;
    justify-content: center;

    textarea{
        max-width: 60%;
        height: 7rem;
        background: $LightGray;
    }
}

.imageContainer{
    width: 100%;
    
    display: flex;
    justify-content: space-evenly;

    align-items: center;
}

.reportedImg{
    width: 35%;
    max-height: 750px;
    
    position: relative;

    overflow: hidden;

    img{
        width: 100%;
        height: 100%;
    }
    .selectImage{
        width: 100%;
        height: 100%;
        
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        border: 3px solid $LightGray;
    }
}

.buttonContainer{
    width: 100%;

    display: flex;
    justify-content: center;
}

.removeImageBtn{
    width: 35px;
    height: 35px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: .5rem;
    right: .5rem;

    transition: $TransitionSpeed;

    border-radius: 9999px;
    border: 3px solid $LightPurple;

    background-color: $LightGray;

    span{
        font-size: 25px;
        font-weight: bold;
        color: $DarkGray;

        user-select: none;

        transition: $TransitionSpeed;
    }

    &:hover, &:focus{
        background-color: $DarkGray;

        span{
            color: $LightGray;
        }
    }
}

.selectPreview{
    height: 25%;
}

@media only screen and (max-width: 600px) {
    .reportDescription{
        textarea{
            max-width: 95%;
        }
    }
    .imageContainer{
        display: flex;
        flex-direction: column;

        align-items: center;
    }
    .reportedImg{
        width: 95%;
        margin-bottom: 2rem;
    }
}
</style>