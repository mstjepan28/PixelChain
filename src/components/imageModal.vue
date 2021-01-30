<template>
<div id="imagePopup" @click="hidePopup">
    <div class="mobileNavbar" @click.stop>
        <span class="material-icons" @click="hidePopup"> keyboard_backspace </span>
    </div>

    <div class="popupContent" @click.stop>
        <img id="imageId" :src="info.imgSrc">

        <div class="imageInfo">
            <div>
                <h6 v-if="info.author" style="overflow-wrap: break-word;">{{info.author.username + " "}}</h6>
                <h6 v-else style="overflow-wrap: break-word;">Anonymous</h6>
                <h6><small>{{info.timestamp}}</small> </h6>
                <p>{{info.description}}</p>   
            </div>
            
            <hr class="LightPurple">
        <!--
            <div class="commentSection">
                <div class="comment mb-4" :key="comment.timestamp + Math.random()" :info="comment" v-for="comment in info.comments">
                    <h6>{{comment.author + " "}} <small>{{comment.timestamp}}</small></h6> 
                    <p>{{comment.text}}</p>
                </div>
            </div>

            <hr class="LightPurple">

            <div class="newComment">
                <textarea v-model="newComment" class="inputText" placeholder="New comment..."></textarea>
                <button>Post</button>
            </div>
        -->
            <div class="reportOptions">
                <button @click="reportImage">Report this image</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import store from '@/store.js';

export default {
    props: {
        info: {
            id: {type: String, required: true},
            imgSrc: {type: String, required: true},
            author: {type: Object, required: true},
            views: {type: Number, required: true},

            timestamp: {type: Number, required: true},
            comments: {type: Array, required: false}
        }
    },
    data(){
        return{
            date: "",
            newComment: "",
        }
    },
    methods:{
        convertCommentTimeStamps(comments){
            comments.forEach(comment => {
                comment.timestamp = store.timestampToDate(comment.timestamp);
            });
            return comments;
        },
        reportImage(){
            this.$emit('closePopup');
            this.$router.push({ name: 'SubmitReport', params: { cid: this.info.cid } })
        },
        hidePopup(){
            this.$emit('closePopup');
        }
    },
    watch:{
        info(){
            if(!this.info) return;
            this.info.timestamp = store.timestampToDate(this.info.timestamp);
            this.info.comments = this.convertCommentTimeStamps(this.info.comments);
        }
    }
}
</script>



<style lang="scss" scoped>
@import "@/styles/animations";

#imagePopup{
    @include fadeIn;
    
    width: 100%;
    height: 100%;

    position: fixed;
    z-index: 9999;

    display: none;

    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.6);
}

.mobileNavbar{
    width: 100%;

    padding: .25rem .5rem;

    display: none;
    align-items: center;

    z-index: 9999;

    position: fixed;
    top: 0;

    background: $DarkGray;

    span{
        font-size: 40px;
    }
}

.popupContent{
    width: 75%;
    height: 90%;

    position: fixed;
    top: 5%;

    display: flex;
    flex-direction: row;


    img{
        width: 50%;
    }
}

.imageInfo{
    width: 50%;

    display: flex;
    flex-direction: column;
    /*
        justify-content: center;
    */
    padding: 1.5rem 1rem;
    
    background: $DarkGray;
    p{
        margin: 0;
    }
}

.commentSection{
    height: 60%;
    overflow: auto;

    .comment{
        font-size: 14px;

        padding: .5rem;
        margin-right: .5rem;

        background: $Gray;
    }
}

.newComment{
    display: flex;
    justify-content: flex-end;

    border-radius: 5px;
    border: 2px solid $LightPurple;

    button{
        @include RemoveDefaultButton;

        padding-right: 1.5rem;
        
        font-size: 17px;

        transition: $TransitionSpeed;

        background: $Gray;

        &:hover, &:focus{
            font-weight: bold;
            color: $LightPurple;
            
            outline: none;
        }
    }
}

.reportOptions{
    display: flex;
    flex-direction: row;

    justify-content: space-evenly;

    margin-top: 1rem;

    button{
        @include RemoveDefaultButton;
        font-size: 14px;

        color: red;
        text-decoration: underline;
    }
}

@media only screen and (min-width: 600px){
    #imagePopup{
        @include fadeIn;
    }
    .popupContent{
        @include slideInTop;
    }
}
@media only screen and (max-width: 600px){
    .mobileNavbar{
        display: flex;
    }
    .popupContent{
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;

        top: 0;

        overflow: auto;

        img{
            height: 100%;
            width: 100%;
        }
    }
    .imageInfo{
        min-height: 100%;
        width: 100%;
    }
}

</style>