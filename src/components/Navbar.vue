<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">

    <router-link class="navbar-brand" to="/">Pixelchain</router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link class="nav-link" to="/" :class="{curRoute: isCurRoute('/')}">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/Gallery" :class="{curRoute: isCurRoute('/Gallery')}">Gallery</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/Artists" :class="{curRoute: isCurRoute('/Artists')}">Artists</router-link>
            </li>
            <li class="nav-item" v-if="isDrizzleInitialized">
                <router-link class="nav-link" to="/PostImage" :class="{curRoute: isCurRoute('/PostImage')}">Post image</router-link>
            </li>
            <li class="nav-item" v-if="isDrizzleInitialized">
                <router-link class="nav-link" to="/ReviewReports" :class="{curRoute: isCurRoute('/ReviewReports')}">View reports</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/AboutUs" :class="{curRoute: isCurRoute('/AboutUs')}">About us</router-link>
            </li>
        </ul>

        <span v-if="!isDrizzleInitialized" class="navbar-text">
            <button class="ButtonDesign2S Orange" @click="login"> Login with Metamask </button >
        </span>

        <span v-else-if="isDrizzleInitialized" class="navbar-text">
            <button v-if="store.currentUser.username" class="ButtonDesign2S White" @click="showCurUser"> {{store.currentUser.username}} </button>
            <button v-else class="ButtonDesign2S White" @click="showCurUser"> Anonymous </button>
            <button class="ButtonDesign1" @click="logout"> Log out </button>
        </span>
    </div>
</nav>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store.js';
export default {
    data(){
        return{
            store,
            auth: false,
        }
    },
    methods:{
        login(){
            this.auth = !this.auth;
        },
        logout(){
            this.auth = !this.auth;
            console.log("Logout user");
        },
        showCurUser(){
            this.$emit('showUser');
        },
        isCurRoute(route){
            return this.$route.path == route
        },
    },
    computed: {
		...mapGetters('drizzle', ['isDrizzleInitialized'])
	},
}
</script>

<style lang="scss" scoped>
.navbar-text{
    padding: 0;
}

a:hover{
    text-decoration: none;
}

span > a, button{
    margin: 0 .5em;
}

.nav-item{
	margin: 0 4% 0 0;
    white-space: nowrap;
    
    & > a{
        font-size: 16px;
        color: $HighlightColor;
    }
    & > a:hover{
        text-decoration: underline
    }
}
.nav-link{
    color: white;
}

.curRoute{
    text-decoration: underline;
}


@media only screen and (max-width: 991px) {
    .navbar-nav, .navbar-text{
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        border-bottom: 1px solid $LightPurple;
    }
}
</style>