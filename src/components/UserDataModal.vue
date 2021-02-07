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

            <hr class="PurpleLine"/> 

            <div class="modal-body">
                <div v-if="info.account && !checkUserData">
                    <p><small>Account:</small><br> {{info.account}}</p>
                    <p><small>Balance:</small><br> {{info.balance + " ETH"}} </p>

                    <form @submit.prevent="addUserData()">
                        <p>Please fill the form with your information: </p>

                        <input class="inputBox2" v-model="newUserData.name" type="text" placeholder="Name" required/>
                        <input class="inputBox2" v-model="newUserData.lastname" type="text" placeholder="Last name" required/>
                        <input class="inputBox2" v-model="newUserData.username" type="text" placeholder="User name" required/>

                        <button v-if="isFormFilled" type="submit" class="ButtonDesign2S LightPurple"> Add information </button>
                        <button v-else class="ButtonDesign2S LightGray" disabled> Add information </button>
                    </form>
                </div>
                <div v-else>
                    <p><small>Full Name:</small><br> {{info.name}} {{info.lastname}}</p>
                    <p><small>Account:</small><br> {{info.account}}</p>
                    <p><small>Balance:</small><br> {{info.balance + " ETH"}} </p>
                </div>
            </div>

            <hr class="PurpleLine" style="margin-bottom: 1.5rem;"/> 

        </div>
    </div>
</div>
</template>

<script>

export default {
    props: ["info"],
    data(){
        return{
            newUserData: {},
        }
    },
    computed:{
        // Ako postoji atribut name tada postoje je korisnik ispunio podatke
        checkUserData(){
            return this.info.name? true: false;
        },

        // Provjera ako su svi podaci uneseni
        isFormFilled(){
			return this.newUserData.name && this.newUserData.lastname && this.newUserData.username? true: false;
		}
    },
    methods:{
        // Uneseni podaci se emitiraju parent-u gdje se dalje obraduju
        addUserData(){
            this.$emit("addUserData", this.newUserData);
            this.newUserData = {};
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-content{
    border: 2px solid $LightPurple;
}
.modal-header{
    border: none;
}
.PurpleLine{
    width: 90%;
    align-self: center;
    margin: 0;
}
small{
    text-decoration: underline;
}
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