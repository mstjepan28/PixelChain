<template>
<div class="row">
    <div class="column">
        <div class="imgContainer" :key="imgSrc"  v-for="imgSrc in images.col1"> 
            <img :src="imgSrc"/> 
        </div>
    </div>
    <div class="column" :src="imgSrc">
        <div class="imgContainer" :key="imgSrc" v-for="imgSrc in images.col2">
            <img :src="imgSrc"/> 
        </div>
    </div>
    <div class="column" :src="imgSrc">
        <div class="imgContainer" :key="imgSrc" v-for="imgSrc in images.col3">
            <img :src="imgSrc"/> 
        </div>
    </div>
</div>
</template>

<script>
import testData from '@/TestData.js';

export default {
    data(){
        return{
            images: {
                col1: [],
                col2: [],
                col3: [],
            }
        }
    },
    methods:{
        getImages(){
            let imageList = testData.getImgUrls();
            
            const chunkSize = Math.ceil(imageList.length / 3);

            this.images.col1 = imageList.slice(0, chunkSize);
            this.images.col2 = imageList.slice(chunkSize, chunkSize*2);
            this.images.col3 = imageList.slice(chunkSize*2, imageList.length);
        },
    },
    mounted(){
        this.getImages();
    }
}
</script>

<style lang="scss" scoped>
.row{
    height: 80%;
    width: 90%;

    display: flex;
    align-self: center;
    flex-wrap: wrap;

    padding: 0 4px;

    background: red;
}

.column {
    flex: 33%;
    
    max-width: 33%;
    padding: 0 4px;
}

.imgContainer{
    width: 100%;

    vertical-align: middle;
    margin-top: 8px;
    position: relative;

    & > img{
        width: 100%;
        transition: 0.3s;
        z-index: 10000;
    }
    & > img:hover{
        width: 110%;
        height: 110%;

        
    }
}

@media screen and (max-width: 800px) {
    .column {
        flex: 50%;
        max-width: 50%;
    } 
}

@media screen and (max-width: 600px) {
    .column {
        flex: 100%;
        max-width: 100%;
    }
}

</style>