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
					<div v-if="user.account && !userHasData">
						<p>Account: {{user.account}}</p>
						<p>Balance: {{user.balance + " Wei"}} </p>
						<form>
							<input v-model="name" type="text" placeholder="Name" required/>
							<input v-model="lastname" type="text" placeholder="Last name" required/>
							<input v-model="username" type="text" placeholder="User name" required/>
							<button @click="addUser()" >Add</button>
						</form>
					</div>
					<div v-else>
						<p>Full Name: {{user.name}} {{user.lastname}}</p>
						<p>Balance: {{user.balance}}</p>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="ButtonDesign2S LightPurple" data-dismiss="modal">Okay</button>
				</div>
			</div>
		</div>
	</div>

	<Navbar :info="username" @showUser="showUser"/>

	<router-view/>

	<footer> @ 2020 by Lorem Ipsum </footer>
</div>
</template>

<script>
import store from './store';
import Navbar from '@/components/Navbar.vue';
import { mapGetters } from 'vuex';

export default {
	components: { Navbar },
	data(){
		return{
			user: {},
			userHasData: false,
			name: "",
			lastname: "",
			username: "",
		}
	},
    computed: {
		...mapGetters("drizzle", ["drizzleInstance"]),
	},
	methods:{
		async addUser(){
			await this.drizzleInstance.contracts.IPFSImageStore.methods.setUser.cacheSend(this.name, this.lastname, this.username);
			this.name = "";
			this.lastname = "";
			this.username = "";
		},
		showUser(){
			$('#userModal').modal('show')
		},
		async checkState(){
			// Dohvati trenutno stanje inicijalizacije drizzle
			let state = this.$store.getters['drizzle/isDrizzleInitialized'];

			// Ako drizzle nije inicijaliziran, pricekaj 500ms i ponovno provjeri. Petlja se izvrsava
			// sve dok se drizzle ne inicijalizira
			while(!state){
				const delay = new Promise(resolve => setTimeout(resolve, 500));
				await delay;

				state = this.$store.getters['drizzle/isDrizzleInitialized'];
			}

			
		},
		setUser(user){ //Funkcija koja postavlja podatke korisnika za prikaz u aplikaciji.
			if(!user){ // slučaj kada ne posotje podatci o korisniku onda se samo prikazuje hash računa i iznos na računu
				const account = this.$store.getters['accounts/activeAccount'];
				const balance = this.$store.getters['accounts/activeBalance'];

				this.user = { account, balance };
				this.userHasData = false;
			}else{ // Slučaj kada postoje podatci o korisniku
				const name = user.name;
				const lastname = user.lastname;
				const username = user.username;
				const balance = (this.$store.getters['accounts/activeBalance'] / 1000000000000000000).toPrecision(6);
				this.user = {
					name,
					lastname,
					username,
					balance
				}
				store.currentUser = this.user;
				this.userHasData = true;
			}
			
		},
		async checkUser(){ //Funkcija provjerava postoje li podatci o koriniku. Ako postoje vraća ih nazad
			const result = await this.drizzleInstance.contracts.IPFSImageStore.methods.getUser().call();
			if(result.name != "" && result.lastname != "" && result.username != ""){
				return result
			}
			return null;
		}
	},
	async mounted(){
		await this.checkState(); // cekanje inicijalizacije drizzle-a
		const user = await this.checkUser(); // dohvacanje podataka o korisniku. Ako korisnik nema podatke prikazuje se gumb za dodavanje
		this.setUser(user); // postavaljnje trenutnog korisnika
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
