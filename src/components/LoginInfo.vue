<template>
<div class="modal fade" id="loginTutorial" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">How to login: </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <p>
                    To login you must have a Metamask browser extension. Once you have it, select your account in Metamask and you will login in automatically
                </p>
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

}
</script>

<style lang="scss" scoped>
.modal-body{
    text-align: center;
}
</style>