<template>
<router-link :to="'/User/' + info.id" class="cardBody">
    
    <img class="profilePic" src="@/assets/profile.png" alt="profile image"/>

    <h3 class="userInfo"> {{info.name}} </h3>
    <h4 class="userInfo"> {{info.occupation}} </h4>
    
</router-link>
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
    
    data: () => {
        return{
            cardImgSrc: '@/assets/header.jpg',
            profileImgSrc: '@/assets/profile.png',
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
    margin-bottom: 1.5rem 0;
}

.userInfo{
    color: $DetailColor;
    word-wrap: break-word;
}

</style>