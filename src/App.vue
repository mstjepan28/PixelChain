<template>
<div>
    <div class="modal fade" id="authModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
			<div v-if="selectedModal == 'login'" class="modal-content">
				<LoginModal @closeModal="closeModal"/>
			</div>

			<div v-else-if="selectedModal == 'register'" class="modal-content">
				<RegisterModal @closeModal="closeModal"/>
			</div>
        </div>
    </div>

	<Navbar @openAuthModal="openAuthModal"/>

	<router-view/>

	<footer> @ 2020 by Lorem Ipsum </footer>
</div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
import Navbar from '@/components/Navbar.vue';
import store from '@/store.js';

export default {
	components: { Navbar, LoginModal, RegisterModal},
	data(){
		return{
			store,
			selectedModal: ""
		}
	},
	methods: {
		openAuthModal(modalName){
			this.selectedModal = modalName;
			$('#authModal').modal('show');
		},
		closeModal(){
			$('#authModal').modal('hide');
		}
	},
}
</script>

<style lang="scss" scoped>
footer{
	padding: 1rem;
	
	color: white;
	text-align: center;

	background: $DarkGray;
}
</style>
