<template>
<div>
	<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Current user's account and balance: </h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<router-link to="/CurrentUser" class="ButtonDesign1">
						<p>Account: {{user.account}}</p>
						<p>Balance: {{user.balance}}</p>
						{{user}}
					</router-link>
				</div>

				<div class="modal-footer">
					<button type="button" class="ButtonDesign2S LightPurple" data-dismiss="modal">Okay</button>
				</div>
			</div>
		</div>
	</div>

	<Navbar @showUser="showUser"/>

	<router-view/>

	<footer> @ 2020 by Lorem Ipsum </footer>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import {mapGetters} from 'vuex';

export default {
	components: { Navbar },
	data(){
		return{
			user: {
				account: this.$store.getters['accounts/activeAccount'],
				balance: this.$store.getters['accounts/activeBalance'],	
			},
		}
	},
    computed: {
		...mapGetters('drizzle', ['isDrizzleInitialized'])
	},
	methods:{
		showUser(){
			$('#userModal').modal('show')
		}
	}
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
