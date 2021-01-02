<template>
<div class="postImage">
    <div>
        <hr class="PurpleLine"/> <InfoBox :info="PostImage"/> <hr class="PurpleLine"/>
    </div>

    <file-pond
        class="filepond"
        name="test"
        ref="pond"
        label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"

        image-crop-aspect-ratio="1"
        allowImageCrop="true"
        allowImageTransform="true"

        :files="myFiles"
        :allow-multiple="false"

        labelMaxFileSizeExceeded="File too big to upload"
        labelMaxFileSize="Max file size: 5MB"
        maxFileSize="5MB"
    />

    <textarea class="inputText" placeholder="Write a description for your image..." v-model="imgDescription"></textarea>

    <div class="buttonContainer">
        <button class="ButtonDesign2S LightPurple" @click="postImage">Post</button>
    </div>
</div>
</template>

<script>
// FilePond https://pqina.nl/filepond/docs/patterns/frameworks/vue/
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import InfoBox from '@/components/InfoBox';
import store from '@/store.js';

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateSize,
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform
)

export default {
    components: { FilePond, InfoBox },
    data(){
        return{
            myFiles: [],
            PostImage: { title: "Post a new image", text: store.placeholderText },

            imgDescription: '',
        }
    },
    methods:{
        postImage(){
            const file = this.$refs.pond.getFiles()[0]
            if(!file) return;

            const newImage = {
                imgSrc: file.getFileEncodeDataURL(),
                author: "",
                views: 0,
                description: this.imgDescription,
                timestamp: Date.now(),
                comments: []
            }

            console.log(newImage);
        },
    }
}
</script>

<style lang="scss" scoped>
.postImage{
    margin-top: 5rem;
    padding: 0 5rem;

    & > *{
        margin-bottom: 2rem;
    }
}
.inputText{
    height: 5rem;
    border: 2px solid $LightPurple;
}
.buttonContainer{
    display: flex;
    justify-content: flex-end;

    .ButtonDesign2S{
        width: 25%;
    }
}
@media only screen and (max-width: 600px) {
    .postImage{
        padding: 0 1rem;
    }
    .ButtonDesign2S{
        width: 100%;
        margin: 0;
    }
}
</style>