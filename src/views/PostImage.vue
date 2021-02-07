<template>
<div class="postImage">
	<div>
		<hr class="PurpleLine" />
		<InfoBox :info="PostImage" />
		<hr class="PurpleLine" />
	</div>

	<file-pond
		class="filepond"
		name="test"
		ref="pond"
		label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
		:files="myFiles"
		:allow-multiple="false"
		labelMaxFileSizeExceeded="File too big to upload"
		labelMaxFileSize="Max file size: 5MB"
		maxFileSize="5MB"
	/>

	<div v-if="imageExists" class="imageExists"> Image already exists! </div>

	<textarea
		class="inputText"
		placeholder="Write a description for your image..."
		v-model="imgDescription"
	></textarea>

	<div class="buttonContainer">
		<button class="ButtonDesign2S LightPurple" @click="createImage">Post</button>
	</div>
</div>
</template>

<script>
// FilePond https://pqina.nl/filepond/docs/patterns/frameworks/vue/
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

import InfoBox from "@/components/InfoBox";
import store from "@/store.js";

import { mapGetters } from "vuex";
import ipfs from "../store/ipfs";

// Create component
const FilePond = vueFilePond(
	FilePondPluginFileValidateSize,
	FilePondPluginFileEncode,
	FilePondPluginImagePreview,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
);

export default {
	components: { FilePond, InfoBox },
	data() {
		return {
			myFiles: [],
			PostImage: { title: "Post a new image", text: store.placeholderText },

			ipfsService: ipfs,
			imgDescription: "",

			imageExists: false,
		};
	},
	computed: {
		...mapGetters("drizzle", ["drizzleInstance"]),
	},
	methods: {
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

		async getAuthor(){
			await this.checkState();
			
			const author = await store.currentUser? store.currentUser: this.$store.getters['accounts/activeAccount'];
			console.log(author)
			return author.value? author.username: "Anonymus";
		},

		async createImage(){
			// Dohvati dodanu datoteku, ukoliko postoji nastavi sa funkcijom
			const file = this.$refs.pond.getFiles()[0];
			if (!file) return;

			const author = await this.getAuthor();
			// Stvori novi objekt 
			const newImage = {
				imgSrc: file.getFileEncodeDataURL(),
				author: author,
				description: this.imgDescription,
				timestamp: Date.now(),
			};

			// Novo stvoreni objekt proslijedi u funkciju koja ga dodaje na IPFS
			this.postImage(newImage);
		},

		async postImage(newImage){
			this.imageExists = false;

			// Dodaje sliku na IPFS te se dobiva response u kojemu se nalazi CID
			const ipfsResponse = await this.ipfsService.add(newImage.imgSrc).catch(err => {
				console.log(err);
			});
			console.log(newImage, ipfsResponse.cid.string);
			const status = await this.drizzleInstance.contracts.IPFSImageStore.methods.checkImage(ipfsResponse.cid.string).call();

			if(status){
				this.drizzleInstance.contracts.IPFSImageStore.methods.set.cacheSend(ipfsResponse.cid.string, newImage.author, newImage.description);
				return this.$router.push({ name: 'Home' })
			}

			this.imageExists = true;
		},
	},
};
</script>

<style lang="scss" scoped>
.imageExists{
	color: red;
	
	text-align: center;
	margin: .5rem 0 1rem 0;
}
.postImage {
	margin-top: 5rem;
	padding: 0 5rem;
}
.inputText {
	height: 5rem;
	border: 2px solid $LightPurple;
}
.buttonContainer {
	display: flex;
	justify-content: flex-end;

	.ButtonDesign2S {
		width: 25%;
	}
}
.buttonContainer{
	margin: 1.5rem 0;
}
@media only screen and (max-width: 600px) {
	.postImage {
		padding: 0 1rem;
	}
	.ButtonDesign2S {
		width: 100%;
		margin: 0;
	}
}
</style>
