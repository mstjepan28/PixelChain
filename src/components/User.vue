<template>
<router-link :to="'/User/' + info.id" class="user">
    
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
.user{
    
    transition: 0.3s;

    &:hover, &:focus{
        .userInfo{
            font-size: 30px;
        }
        .profilePic{
            width: $profilePicSize + .75rem;
            height: $profilePicSize + .75rem;
        }
        text-decoration: none;
    }
    &:focus{
        outline: none;
    }
}
.profilePic{
    @include profilePic;
    margin-bottom: 1.5rem 0;
    transition: $TransitionSpeed;
}

.userInfo{
    color: $DetailColor;
    word-wrap: break-word;
    transition: $TransitionSpeed;
}
</style>