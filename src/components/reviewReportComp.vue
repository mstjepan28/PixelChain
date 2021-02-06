<template>
<div class="report">
    <div class="reportCol"> <img :src="info.reportedImg" alt=""> </div>
    <div class="reportCol"> <img :src="info.matchingImg" alt=""> </div>
    
    <div class="reportCol" style="margin: 1rem 0"> 
        <p class="description">{{info.description}}</p>

        <div class="dates">
            <p>Reported on: <small>{{info.reportedDate}}</small></p>
            <p>Report expires on: <small>{{info.reportEndDate}}</small></p>
        </div>


        <h6 style="align-self: center"> Is this report valid? </h6>
        <div class="votingContainer">
            <hr class="PurpleLine"/>
            <button class="ButtonDesign2S LightPurple" @click="addVote(true)"> Yes </button>
            <button class="ButtonDesign2S LightPurple" @click="addVote(false)"> No </button>
            <hr class="PurpleLine"/>
        </div>
    </div>
</div>
</template>

<script>

import store from '@/store.js';

export default {
    /* Report object 
     {
        id: "",
        reportedImg: "",
        matchingImg: "",
        description: "",

        reportedDate: "",
        reportEndDate: "",

        validReport: "",

        votes: {
            valid: 0,
            invalid: 0
        }
     }
    */
    props: {
        info: {
            id: {type: String, required: true},
            reportedImg: {type: String, required: true},
            matchingImg: {type: String, required: true},
            description: {type: String, required: true},

            reportedDate: {type: Number, required: true},
            reportEndDate: {type: Number, required: true},
            
            validReport: {type: Boolean, required: true},

            votes: {type: Object, required: true}
        }
    },
    data(){
        return{
            date: "",
            newComment: "",
        }
    },
    methods:{
        async addVote(vote){
            const results = await this.$parent.addVote(vote, this.info.id)
            console.log(results)
        },
    },
    mounted(){
        this.info.reportedDate = store.timestampToDate(this.info.reportedDate);
        this.info.reportEndDate = store.timestampToDate(this.info.reportEndDate);
    }
}
</script>

<style lang="scss" scoped>
.report{
    width: 100%;

    display: flex;
    flex-basis: 100%;
    justify-content: space-evenly;

    margin: 2rem 0;
    

    background: $Gray;
}
.reportCol{
    max-width: 30%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    img{
        max-width: 100%;
    }
}
.description{
    max-height: 20rem;
    overflow: auto;
}
.dates{
    margin: 1rem 0;

    border-top: 1px solid $LightGray;
    border-bottom: 1px solid $LightGray;

    *{
        margin: .5rem 0;
    }
}
.votingContainer{
    display: flex;
    justify-content: center;

    hr{
        width: 90%;
    }
}
</style>