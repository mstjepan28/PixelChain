<template>
<form class="modal-content" v-on:submit.prevent="signup">
    <!-- Header modala -->
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Registracija</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <!-- Unos podataka u formu -->
    <div class="modal-body" >
        <!-- Ime i prezime korisnika -->
        <div>
            <label for="name"> First and last name: </label>
            <input id="name" class="inputBox" type="text" v-model="userData.name" required>
        </div>

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

        <!-- Ponovni upis lozinke za potvrdu -->
        <div :class="{missmatchPasswords: comparePasswords}">
            <label for="cPassword"> Confirm password: </label>
            <input id="cPassword" class="inputBox" type="password" v-model="confirmPassword" required>
        </div>

        <!-- Ispis grešaka koje mogu nastati prilikom registracije -->
        <small :class="{error: comparePasswords}"> Unesene lozinke se ne podudaraju </small>
    </div>
    
    <!-- Gumb za zatvaranje modala i za registraciju -->
    <div class="modal-footer">
        <button type="button" class="ButtonDesign2S Red" data-dismiss="modal"> Close </button>
        
        <!-- Gumb za registraciju se onemogucuje ukoliko se unesene lozinke ne podudaraju -->
        <button v-if="!comparePasswords" type="submit" class="ButtonDesign2S Green"> Sign up </button>
        <button v-else type="button" class="ButtonDesign2S LightGray" disabled> Sign up </button>
    </div>
</form>
</template>

<script>
export default {
    data(){
        return{
            userData:{},
            confirmPassword: '',
            error: {}
        }
    },
    computed:{
        comparePasswords(){
            // pohrana u posebne varijable zbog citljivosti koda
            const cPassword = this.confirmPassword;
            const password = this.userData.password;

            // ukoliko je unesena cPassword, provjeri ako se podudara sa password
            //  ukoliko se ne podudara, zabiljezi to kao error type1
            return !(cPassword == password || cPassword.length == 0);
        }
    },
    methods:{
        signup(){

            this.resetData();
            this.closeModal();
        },

        // Prije zatvaranja modala, brisemo unesene podatke
        resetData(){
            this.userData = {};
            this.error = {};
            this.confirmPassword = '';
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