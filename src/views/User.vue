<template>
<div class="userProfile">
    <ImageModal @closePopup="closePopup" :info="selectedImage"/>

    <div class="userInfo">
        <div class="profilePic">
            <img :src="user.profilePicSrc" alt="">
        </div>

        <div class="textInfo">
            <hr class="PurpleLine"/>
            <InfoBox :info="{title: user.name, text: user.bio}"/>
            <hr class="PurpleLine"/>
        </div>
    </div>

    <div class="pageContent" v-if="images">
        <div class="images">
            <img @click="openPopup(img)" :key="img.id" :src="img.imgSrc" v-for="img in images"/>
        </div>
    </div>
</div>
</template>

<script>
import store from '@/store.js';
import InfoBox from '@/components/InfoBox.vue';
import ImageModal from '@/components/imageModal';

export default {
    components:{ InfoBox, ImageModal },
    data(){
        return{
            id: this.$route.params.id,
            user: false,
            images: false,

            selectedImage: false,
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

		// Get content ----------------------------------------------------------------------------
        getUser(){
            this.user = store.users.filter(user => user.id == this.id)[0];
        },
        getUserImages(){
            this.images = store.images//.filter(img => img.author == this.user.name);
        }
    },
    mounted(){
        this.getUser();
        this.getUserImages();
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/ContentPage.scss";
@import "@/styles/imageGrid.scss";
.userProfile{
    margin-top: 5rem;
}
.userInfo{
    display: flex;
    flex-direction: row;

    text-align: center;
    align-items: center;
    justify-content: center;

    padding-top: 2rem;

    border-top: 1px solid $LightGray;
    border-bottom: 1px solid $LightGray;

    background: $Gray;
}

.profilePic{
    max-height: 15rem;
    max-width: 15rem;
    
    margin-right: 3rem;
    margin-bottom: 2rem;
    
    overflow: hidden;

    border-radius: 9999px;
    border: 4px solid $LightPurple;

    img{
        width: 100%;
        height: 100%;
    }
}
.textInfo{
    max-width: 50%;
    
    .PurpleLine{
        width: 90%;
    }

    .textBox{
        margin-right: 0;
        margin-left: 0;
    }
}
@media only screen and (max-width: 700px){
    .userInfo{
        flex-direction: column;
    }
    .profilePic{
        margin-right: 0;
    }
    .textInfo{
        max-width: 90%;
    }
}
</style>