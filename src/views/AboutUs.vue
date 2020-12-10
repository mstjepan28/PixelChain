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
import testData from '@/TestData.js';

export default {
    components:{
        InfoBox
    },
    data(){
        return{
            AboutUs: { title: "About us", text: testData.placeholderText },
            Artists: { title: "Artists", text: testData.placeholderText },
            Images: { title: "Images", text: testData.placeholderText }
        }
    }
}
</script>

<style lang="scss" scoped>
.aboutUs{
    margin: 5rem 0;
}
</style>