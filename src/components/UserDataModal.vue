<template>
<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Current user's account and balance: </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <div v-if="info.account && !userHasData">
                    <p>Account: {{info.account}}</p>
                    <p>Balance: {{info.balance + " ETH"}} </p>

                    <form @submit.prevent="addUserData()">
                        <p>Please fill the form with your information: </p>

                        <input class="inputBox2" v-model="user.name" type="text" placeholder="Name" required/>
                        <input class="inputBox2" v-model="user.lastname" type="text" placeholder="Last name" required/>
                        <input class="inputBox2" v-model="user.username" type="text" placeholder="User name" required/>

                        <button v-if="isFormFilled" type="submit" class="ButtonDesign2S LightPurple"> Add information </button>
                        <button v-else class="ButtonDesign2S LightGray" disabled> Add information </button>
                    </form>
                </div>
                <div v-else>
                    <p>Full Name: {{info.name}} {{info.lastname}}</p>
                    <p>Balance: {{info.balance}}</p>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="ButtonDesign2S LightPurple" data-dismiss="modal">Okay</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ["info"],
    data(){
        return{
            user: {},
            userHasData: false,
        }
    },
    computed:{
        // Provjera ako su svi podaci uneseni
        isFormFilled(){
			return this.user.name && this.user.lastname && this.user.username? true: false;
		}
    },
    methods:{
        // Ako postoji atribut name tada postoje je korisnik ispunio podatke
        checkUserData(){
            this.userHasData = this.info.name? true: false;
        },
        // Uneseni podaci se emitiraju parent-u gdje se dalje obraduju
        addUserData(){
            this.$emit("addUserData", this.user);
            this.user = {};
        }
    },
    mounted(){
        this.checkUserData();
    }
}
</script>

<style lang="scss" scoped>
form{
	display: flex;
	flex-direction: column;
	
	text-align: center;
	justify-content: center;

	padding: .5rem;

	border-radius: 16px;
	border: 1px solid red;

	& > input{
		margin-bottom: 1rem;
	}

	& > button{
		align-self: flex-end;
	}
}

</style>