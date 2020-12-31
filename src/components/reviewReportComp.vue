<template>
<div>
    {{info}}
</div>
</template>

<script>
export default {
    props: {
        info: {
            id: {type: String, required: true},
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
}
</script>

<style>

</style>