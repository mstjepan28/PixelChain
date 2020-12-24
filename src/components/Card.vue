<template>
<div class="cardBody">
    <slot/>
</div>
</template>

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
        .userInfo{
            font-size: 30px;
        }
        .profilePic{
            width: $profilePicSize + .75rem;
            height: $profilePicSize + .75rem;
        }
        text-decoration: none;
        border: 4px solid $DetailColor;
    }
    &:focus{
        outline: none;
    }
}


</style>