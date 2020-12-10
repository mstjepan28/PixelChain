<template>
<form class="modal-content" v-on:submit.prevent="login">
    <!-- Header modala -->
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Login</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <!-- Unos podataka u formu -->
    <div class="modal-body" >
        <!-- Email adresa korisnika -->
        <div>
            <label for="email"> Email: </label>
            <input id="email" class="inputBox" type="email" v-model="userData.email" required>
        </div>

        <!-- Unos lozinke -->
        <div>
            <label for="password"> Password: </label>
            <input id="password" class="inputBox" type="password" v-model="userData.password" required>
        </div>

        <!-- Ispis grešaka koje mogu nastati prilikom registracije -->
        <small :class="{error: error.login1}"> Incorrect email/password </small>
        
    </div>
    
    <!-- Gumb za zatvaranje modala i za prijavu -->
    <div class="modal-footer">
        <button type="button" class="ButtonDesign2S Red" data-dismiss="modal"> Close </button>
        <button type="submit" class="ButtonDesign2S Green"> Login </button>
    </div>
</form>
</template>

<script>
export default {
    data(){
        return{
            userData:{},
            error: {}
        }
    },
    methods:{
        login(){
            //this.resetData();
            this.closeModal();
        },

        // Prije zatvaranja modala, brisemo unesene podatke
        resetData(){
            this.userData = {};
            this.error = {};
        },

        // emit roditelju da pozove funkciju za zatvaranje modala
        closeModal(){
            this.$emit('closeModal');
        }
    }
}
</script>

<style lang="scss" scoped>
button > span{
    color: $DetailColor;
}

.missmatchPasswords{
    color: red;

    & .inputBox{
        border-color: red;
    }
}
.modal-body{
    display: flex;
    flex-direction: column;

    margin: 0 3rem;

    & > div{
        display: flex;
        flex-direction: column;

        margin: .5rem 0;

    }
    & > div > label{
        margin-bottom: 0rem;
    }
}
.modal-footer{
    display: flex;
}

small{
    display: none;
    color: red;
}
.error{
    display: inline;
}


</style>