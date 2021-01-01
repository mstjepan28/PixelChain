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
            <li class="nav-item">
                <router-link class="nav-link" to="/PostImage" :class="{curRoute: isCurRoute('/PostImage')}">Post image</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/ReviewReports" :class="{curRoute: isCurRoute('/ReviewReports')}">View reports</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/AboutUs" :class="{curRoute: isCurRoute('/AboutUs')}">About us</router-link>
            </li>
        </ul>

        
        
        <span v-if="!auth" class="navbar-text">
            <button class="Orange ButtonDesign2S" @click="login"> Login with Metamask </button >
        </span>
        <span v-else class="navbar-text">
            <router-link to="/CurrentUser" class="ButtonDesign1">{{testUser.name}}</router-link>
            <button class="ButtonDesign1" @click="logout"> Log out </button>
        </span>
    </div>
</nav>
</template>

<script>
import testData from '@/TestData.js';
export default {
    data(){
        return{
            auth: true,
            testUser: testData.users[0]
        }
    },
    computed:{

    },
    methods:{
        login(){
            this.auth = !this.auth;
        },
        logout(){
            this.auth = !this.auth;
            console.log("Logout user");
        },
        isCurRoute(route){
            return this.$route.path == route
        }
    }
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
.curUser{
    color: $DetailColor;
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