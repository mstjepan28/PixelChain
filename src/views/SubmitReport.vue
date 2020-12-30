<template>
<div class="submitReport">
    <div>
        <hr class="PurpleLine"/> <InfoBox :info="submitReport"/> <hr class="PurpleLine"/>
    </div>

    <div class="reportDescription">
        <textarea class="inputText" placeholder="Describe why you are reporting this image..."></textarea>
    </div> <hr class="PurpleLine"/>

    <div v-if="reportedImage" class="imageContainer">
        <div class="reportedImg mb-5">
            <img :src="reportedImage.imgSrc" alt="">
        </div>

        <div v-if="!selectedImage" class="reportedImg">
            <div class="removeImageBtn" @click="removeSelectedImage"> <span class="material-icons"> close </span></div>
            <img :src="selectedImage.imgSrc" alt="">
        </div>
        
        <div v-else class="reportedImg">
            <div class="selectImage">
                <h3>Select image:</h3>

                <div class="selectPreview" :key="img.imgSrc" :src="img.imgSrc" v-for="img in imageList"> 
                    <img :src="img.imgSrc">
                </div>
            </div>
        </div>
    </div> <hr class="PurpleLine"/>

    <div class="buttonContainer">
        <button class="ButtonDesign2S Red" @click="cancelReport"> Cancel </button>
        <button class="ButtonDesign2S LightPurple"> Submit report</button>
    </div> <hr class="PurpleLine"/>
</div>
</template>

<script>

import testData from '@/TestData.js';
import InfoBox from '../components/InfoBox.vue';

export default{
  components: { InfoBox },
    data(){
        return{
            id: this.$route.params.id,
            submitReport: {title: "Submit a report", text: testData.placeholderText },

            imageList: testData.images,

            reportedImage: false,
            selectedImage: false,
        }
    },
    methods:{
        removeSelectedImage(){
            this.selectedImage = false;
        },
        getReportedImage(){
            this.reportedImage = testData.images.filter(image => image.id == this.id)[0];
            this.selectedImage = testData.images.filter(image => image.id == this.id)[0];// TEST
        },
        cancelReport(){
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
}

.reportedImg{
    width: 35%;
    max-height: 750px;
    
    position: relative;

    overflow: auto;

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
    }
}
</style>