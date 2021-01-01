<template>
<div class="report">
    <div class="reportCol"> <img :src="info.reportedImg" alt=""> </div>
    <div class="reportCol"> <img :src="info.matchingImg" alt=""> </div>
    
    <div class="reportCol" style="margin: 1rem 0"> 
        <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, illum? Officiis, rem. Numquam veniam incidunt iusto alias in illum. Ducimus voluptates magni, debitis voluptatem maiores ipsam quibusdam rem, sed similique iusto reiciendis, facilis nisi aliquam dolor voluptatum soluta. Eaque nesciunt recusandae sunt dolorem accusantium. Dolores ullam pariatur minima voluptatem mollitia corporis, at atque assumenda sit cumque culpa veritatis asperiores. Iure laudantium quis id aspernatur facere maiores repudiandae a, dolor esse quidem tenetur quae aliquam nemo numquam cupiditate, temporibus dignissimos iste? Nemo, architecto ipsa iste commodi sequi harum quasi tempora error! Adipisci culpa inventore recusandae. Laudantium velit cumque dolorem consequatur quasi sit, tempore ullam earum obcaecati est nobis, a libero sapiente. Sit, qui. Aperiam obcaecati, ad expedita non repellat molestias, amet pariatur distinctio accusamus iure odit sed! Delectus voluptas ex consequuntur ratione tenetur iste doloribus. Eaque laudantium, atque quia magnam obcaecati molestiae quis veritatis cumque velit nostrum debitis tempora corporis! Incidunt deleniti tempore rem numquam repudiandae placeat ad officia expedita ducimus veritatis culpa consectetur alias autem animi laudantium, perferendis nulla pariatur, reprehenderit laborum ipsa ullam omnis quaerat dignissimos beatae? A illum quas amet laboriosam dignissimos omnis blanditiis ab, quisquam, ullam aliquid iure! Autem, voluptates quam? Eaque, natus at sequi hic distinctio laudantium, architecto delectus reiciendis velit neque ipsam? Esse ullam quisquam illo tenetur dolorum quam delectus. Exercitationem dolor atque beatae? Nobis similique facilis et cum vel accusamus praesentium! Cupiditate ducimus sit perferendis, itaque, modi ex neque necessitatibus atque laudantium eos nulla voluptatibus quasi? Explicabo tempore maxime reprehenderit mollitia, amet tempora exercitationem dolorum deserunt dolores at architecto quisquam nemo modi deleniti voluptatibus sequi impedit fuga error illum quia porro commodi. Magnam commodi facere ipsam eum, consequuntur, delectus consequatur inventore quisquam, veritatis dolorum placeat autem corrupti? Ducimus molestias architecto iure quibusdam laborum sequi veniam excepturi magni labore quam! Quis recusandae enim vel dolor, vitae voluptatum dolores molestiae a adipisci, id ab blanditiis harum, eum voluptate officiis. Expedita dolorem animi iusto maiores nostrum ab id, repellat et, odit quis quidem reiciendis! Labore necessitatibus sunt mollitia, aliquid tempora, nisi sequi nam, animi id omnis pariatur voluptate. Repellendus voluptatem velit nostrum fuga molestiae. Quis asperiores pariatur accusamus eaque accusantium cumque? Quia dignissimos doloremque vitae quis itaque asperiores similique cumque eaque libero fugit, ipsam quod sed corrupti sunt commodi. Libero doloremque distinctio dolores vero pariatur, asperiores, similique magni optio iure suscipit mollitia quod amet deleniti rem iusto veritatis nobis provident. Sed, asperiores neque deserunt, eos in eaque suscipit eligendi alias iure corporis ullam assumenda nostrum veniam provident a veritatis sit facilis! Reiciendis ipsam nisi at ipsa eaque fuga repudiandae cum nobis ex illum, impedit quidem praesentium sit omnis suscipit delectus debitis minus, accusamus sapiente iure libero quibusdam laudantium nemo eius. Nihil neque debitis obcaecati! Iure cumque molestiae ut veritatis velit consequuntur officiis unde ea est praesentium amet, beatae magni rerum, adipisci quaerat hic deleniti aut? Placeat libero, similique ullam nam culpa perferendis atque, doloribus explicabo incidunt consectetur dolor eius possimus pariatur aliquid optio. Ipsa, accusamus inventore voluptatibus illo ea eligendi provident natus veritatis quisquam ducimus, voluptate ad!
        </p>

        <div class="dates">
            <p>Reported on: <small>{{info.reportedDate}}</small></p>
            <p>Report expires on: <small>{{info.reportEndDate}}</small></p>
        </div>


        <h6 style="align-self: center"> Is this report valid? </h6>
        <div class="votingContainer">
            <hr class="PurpleLine"/>
            <button class="ButtonDesign2S LightPurple" @click="addVote(1)"> Yes </button>
            <button class="ButtonDesign2S LightPurple" @click="addVote(-1)"> No </button>
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
        addVote(vote){
            console.log(vote);
        },
    },
    mounted(){
        this.info.reportedDate = store.timestampToDate(this.info.reportedDate);
        //this.info.matchingImg = store.timestampToDate(this.info.matchingImg);
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