<template>
<div class="userProfile">
    <div>
        
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            id: this.$route.params.id,
        }
    },
    mounted(){
        console.log(this.$route)
        console.log(this.id)
    }
}
</script>

<style lang="scss" scoped>
.userProfile{
    margin-top: 5rem;
}
</style>