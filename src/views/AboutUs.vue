<template>
<div class="aboutUs">
    <div>
        <hr class="PurpleLine"/> 
            <InfoBox :info="AboutUs"/> 
        <hr class="PurpleLine"/>
            <InfoBox :info="Artists"/> 
        <hr class="PurpleLine"/>
            <InfoBox :info="Images"/> 
        <hr class="PurpleLine"/>
    </div>
</div>
</template>

<script>
import InfoBox from '@/components/InfoBox';
import store from '@/store.js';

export default {
    components:{
        InfoBox
    },
    data(){
        return{
            AboutUs: { title: "About us", text: store.placeholderText },
            Artists: { title: "Artists", text: store.placeholderText },
            Images: { title: "Images", text: store.placeholderText }
        }
    }
}
</script>

<style lang="scss" scoped>
.aboutUs{
    margin: 5rem 0;
}
</style>