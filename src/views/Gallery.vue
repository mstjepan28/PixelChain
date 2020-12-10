<template>
<div class="PageContent">
    <div>
        <hr class="PurpleLine"/> <InfoBox :info="Gallery"/> <hr class="PurpleLine"/>
    </div>

    <div class="optionsBar">
        <input class="inputBox" type="text" v-model="searchInput" placeholder="Search...">
        
        <Sorting class="sorting" @sort="sortItems">
            <div class="filterItem">
                <input id="name" type="radio" v-model="sortValues" name="sortValues" :value="{atr: 'name', type: 'string'}"> 
                <label for="name"> Name </label>
            </div>
            <div class="filterItem">
                <input id="career" type="radio" v-model="sortValues" name="sortValues" :value="{atr: 'career', type: 'number'}">
                <label for="career"> Career </label>
            </div>
        </Sorting>

        <div></div>
    </div>

    <div class="container pageContent">

    </div>
</div>
</template>

<script>
import InfoBox from '@/components/InfoBox';
import Sorting from '@/components/Sorting';

import testData from '@/TestData.js';

export default {
    components:{
        InfoBox,
        Sorting
    },
    data(){
        return{
            searchInput: '',
            Gallery: { title: "Gallery", text: testData.placeholderText },

            users: testData.users,
            sortValues: false
        }
    },
    methods:{
		sortItems(sortOrder){
			if(!this.sortValues) return;
			this.store.sort_items(this.sortValues, sortOrder, "images");

			this.getProjects();
		},
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/ContentPage.scss";
</style>