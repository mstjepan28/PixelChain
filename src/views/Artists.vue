<template>
<div class="PageContent">
    <div>
        <hr class="PurpleLine"/> <InfoBox :info="Artists"/> <hr class="PurpleLine"/>
    </div>

    <div class="optionsBar">
        <input class="inputBox" type="text" v-model="searchInput" placeholder="Search...">
        <!--
        <Sorting class="sorting" @sort="sortItems">
            <div class="filterItem">
                <input id="name" type="radio" v-model="sortValues" name="sortValues" :value="{atr: 'name', type: 'string'}"> 
                <label for="name"> Name </label>
            </div>
            <div class="filterItem">
                <input id="career" type="radio" v-model="sortValues" name="sortValues" :value="{atr: 'occupation', type: 'string'}">
                <label for="career"> Career </label>
            </div>
        </Sorting> 
        -->
    </div>

    <div class="container pageContent">
        <UserCard :key="card.id" :info="card" v-for="card in users"/>
    </div>
</div>
</template>

<script>
import InfoBox from '@/components/InfoBox';
//import Sorting from '@/components/Sorting';
import UserCard from '@/components/UserCard';

import store from '@/store.js';

export default {
    components:{
        InfoBox,
        //Sorting,
        UserCard
    },
    data(){
        return{
            searchInput: '',
            Artists: { title: "Artists", text: store.placeholderText },

            users: false,
            sortValues: false
        }
    },
    methods:{
        // Sorting --------------------------------------------------------------------------------
		sortItems(sortOrder){
			if(!this.sortValues) return;
			store.sort_items(this.sortValues, sortOrder, "users");

			this.getUsers();
        },

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
    watch:{
        searchInput(){ 
            this.searchInput.length? this.search(this.searchInput): this.getUsers();
        }
    },
    mounted(){
        this.getUsers();
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/ContentPage.scss";
</style>