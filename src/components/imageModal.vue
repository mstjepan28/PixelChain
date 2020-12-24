<template>
<div id="imagePopup" @click="hidePopup">
    <div class="popupContent">
        <img id="imageId" :src="info.imgSrc">

        <div class="imageInfo">
            <button type="button" class="close" @click="hidePopup" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>

            <div>
                <h6>{{info.author}}</h6> 
                <p>{{info.description}}</p>
                <small>{{info.timestamp}}</small>
            </div>

            <hr class="LightPurple"/>
            
            <div class="commentSection">
                <div class="comment mb-2" :key="comment.timestamp + Math.random()" :info="comment" v-for="comment in info.comments">
                    <h6>{{comment.author}}</h6> 
                    <p>{{comment.text}}</p>
                    <small>{{comment.timestamp}}</small>
                </div>
            </div>

            <hr class="LightPurple"/>

            <textarea v-model="newComment" placeholder="New comment..."></textarea>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        info: {
            imgSrc: {type: String, required: true},
            author: {type: String, required: true},
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
        hidePopup(e){
            console.log(this.$refs)
            if (this.$refs.content.contains(e.target)) return;
            this.$emit('closePopup')
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

    background: rgba(0, 0, 0, 0.5);
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

    padding: 1rem;
    
    background: $DarkGray;
    p{
        margin: 0;
    }
}

.commentSection{
    height: 50%;
    overflow: auto;
}

textarea{
    width: 100%;

    display: flex;
    align-self: flex-end;

    padding: .25rem .5rem;
    resize: none;

    border: 2px solid $LightGray;
    background: transparent;

    &:hover, &:focus{
        outline: none;
        border-color: $LightPurple;
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
        width: 100%;
    }
}

</style>