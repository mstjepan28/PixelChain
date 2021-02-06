<template>
<div>
	<LoginInfo/>
	<UserDataModal :info="user" @addUserData="addUser"/>

	<Navbar @openLoginInstructions="openLoginInstructions"/>

	<router-view/>

	<footer> @ 2020 by Lorem Ipsum </footer>
</div>
</template>

<script>
import LoginInfo from "@/components/LoginInfo.vue"
import UserDataModal from "@/components/UserDataModal.vue";
import Navbar from '@/components/Navbar.vue';

import store from './store';
import { mapGetters } from 'vuex';

export default {
	components: { Navbar, UserDataModal, LoginInfo },
	data(){
		return{
			user: {},
		}
	},
    computed: {
		...mapGetters("drizzle", ["drizzleInstance"]),
	},
	methods:{
		openLoginInstructions(){
			$('#loginTutorial').modal('show');
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

		// USER -----------------------------------------------------------------------------------
		//Funkcija provjerava postoje li podatci o koriniku. Ako postoje vraća ih nazad
		async checkUser(){ 
			const result = await this.drizzleInstance.contracts.IPFSImageStore.methods.getUser().call();
			if(result.name != "" && result.lastname != "" && result.username != ""){
				return result
			}
			return null;
		},

		//Funkcija koja postavlja podatke korisnika za prikaz u aplikaciji.
		setUser(user){ 
			const balance = (this.$store.getters['accounts/activeBalance'] / 1000000000000000000).toPrecision(6);

			// slučaj kada ne posotje podatci o korisniku onda se samo prikazuje hash računa i iznos na računu
			if(!user){ 
				const account = this.$store.getters['accounts/activeAccount'];
				store.currentUser = { account, balance };
			}
			// Slučaj kada postoje podatci o korisniku
			else{
				store.currentUser = {
					name: user.name,
					lastname: user.lastname,
					username: user.username,
					balance
				}
			}
			store.userHasData = store.currentUser.name? true: false;

			const randNumber = Math.round(Math.random() * 10) // Modal ima 50% sanse da se pojavi
			if(!store.userHasData && randNumber >= 5) $('#userModal').modal('show');
		},

		async addUser(user){
			await this.drizzleInstance.contracts.IPFSImageStore.methods.setUser.cacheSend(user.name, user.lastname, user.username);
			this.setUser(user);
			$('#userModal').modal('hide');
		},
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
