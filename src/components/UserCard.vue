<template>
<div class="cardBody" @click="gotoUser">
    
    <img class="profilePic" :src="info.profilePicSrc" alt="profile image"/>

    <div class="userInfo">
        <h3> {{info.name}} </h3>
        <h4> {{info.occupation}} </h4>
    </div>
    
</div>
</template>

<script>
export default {
    props: {
        info: {
            id: {type: Number, required: true},
            name: {type: String, required: true},
            occupation: {type: String, required: true},
        }
    },
    data(){
        return{
            cardImgSrc: '@/assets/header.jpg',
            profileImgSrc: '@/assets/profile.png',
        }
    },
    methods:{
        gotoUser(){
            this.$router.push({ name: 'User', params: { id: this.info.id } })
        }
    }
}
</script>

<style lang="scss" scoped>
.cardBody{
    width: 18rem;
    height: 25rem;

    display: flex;
    flex-direction: column;

    text-align: center;
    justify-content: center;

    overflow: hidden;

    border-radius: 16px;
    border: 1px solid $DetailColor;

    background: $Purple;

    transition: 0.15s;

    &:hover, &:focus{
        text-decoration: none;
        border: 4px solid $DetailColor;
    }
    &:focus{
        outline: none;
    }
}

.profilePic{
    @include profilePic;
}

.userInfo{
    color: $DetailColor;
    word-wrap: break-word;

    margin: 1rem 0;
}

</style>