<template>
<div class="bottomNav">
    <router-link to="/" class="navItem">
        <span class="material-icons">location_on</span> Regions
    </router-link>

    <router-link to="/" class="navItem">
        <span class="material-icons">favorite</span> My events
    </router-link>

    <router-link to="/" class="navItem">
        <span class="material-icons">person</span> Account
    </router-link>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.bottomNav{
    display: flex;
    justify-content: stretch;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    background: #1B1C1E;
}
.navItem{
    display: flex;
    flex-grow: 1;
    
    justify-content: center;
    align-items: center;

    font-weight: bold;
    
    padding: .75rem;

    span{
        margin-right: .5rem;
    }

    &:hover{
        color: inherit;
        text-decoration: none;
        background: #2B2B2B;
    }
}
@media only screen and (max-width: 600px) {
    .navItem{
        flex-direction: column;

        span{
            margin: 0;
        }
    }
}
</style>