<template>
<div class="textBox">
    <h1> {{info.title}} </h1>
    <p>{{info.text}}</p>
</div>
</template>

<script>
export default {
    props: {
        info: {
            title: {type: String, required: true},
            text: {type: String, required: true},
        }
    }
}
</script>

<style lang="scss" scoped>
.textBox{
	text-align: center;
	margin: 0 20%;
}
@media only screen and (max-width: 600px){
    .textBox{
        margin: 5%;
    }
    p{
        font-size: 15px;
    }
}
</style>