<template>
<div class="PageContent">
    <div>
        <hr class="PurpleLine"/> <InfoBox :info="Artists"/> <hr class="PurpleLine"/>
    </div>

    <div class="optionsBar">
        <input class="inputBox" type="text" v-model="searchInput" placeholder="Search...">
    </div>

    <div class="container pageContent">
        <UserCard :key="card.id" :info="card" v-for="card in users"/>
    </div>
</div>
</template>

<script>
import InfoBox from '@/components/InfoBox';
import UserCard from '@/components/UserCard';

import store from '@/store.js';

export default {
    components: { InfoBox, UserCard },
    data(){
        return{
            searchInput: '',
            Artists: { title: "Artists", text: store.placeholderText },

            users: false,
            sortValues: false
        }
    },
    methods:{
        // Search ---------------------------------------------------------------------------------
        search(keyword){
            this.users = this.users.filter( user => Object.keys(user).some(atr => 
                new RegExp(keyword).test(user[atr]) 
            ))
        },

        // User setup -----------------------------------------------------------------------------
        getUsers(){
            this.users = store.users;
        },    
    },
    mounted(){
        this.getUsers();
    },
    watch:{
        searchInput(){
            // Ako se promjenio searchInput, provjeri sljedeci uvjet
            // Ako searchInput nije prazan, proslijedi ga u funkciju search(), u suprotnome
            // dohvati pozovi funkciju getUsers() i dohvati sve slike
            this.searchInput.length? this.search(this.searchInput): this.getUsers();
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/styles/ContentPage.scss";
</style>