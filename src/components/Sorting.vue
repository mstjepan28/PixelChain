<template>
<div>
    <div class="btn-group">
        <button type="button" class="iconButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > 
            <i class="material-icons">sort</i> Sortiraj 
        </button>

        <div class="dropdown-menu dropdown-menu-right">
            <div class="dropdownHeader">
                <h5>Sort by: </h5>
            </div>

            <div class="dropdownBody">
                <!-- Filteri se definiraju u na parentu -->             
                <hr/><slot/><hr/>

                
                <div class="sortDirections">
                    <div>
                        <input id="desc" type="radio" name="sort" @click="sortItems('desc')">
                        <label for="desc"><i class="fas fa-sort-amount-up"></i> Ascending </label>
                    </div>

                    <div>
                        <input id="asc" type="radio" name="sort" @click="sortItems('asc')"> 
                        <label for="asc"><i class="fas fa-sort-amount-down-alt"></i> Descending </label>
                    </div>
                </div>     
            </div>

        </div>
    </div>
</div>
</template>

<script>

// Sort sorting out
export default {
    methods:{
        sortItems(sortOrder){
            this.$emit("sort", sortOrder)
        }
    }
}
</script>

<style lang="scss" scoped>
hr{
    margin: .5rem 0;
    background: $LightPurple;
    border-bottom: 2px solid $LightPurple;
}

.dropdown-menu{
    padding: 1.25rem;
    background: $DarkGray;
}
.dropdownHeader{
    margin-bottom: .5rem;
}
.filterItem{
    color: $DetailColor;

    label{
        margin: 0 0 0 .5rem;
    }

    input:checked{
        background: $LightPurple;
    }
}

.sortDirections{
    & > div > label{
        margin: 0;
    }
}

.iconButton{
    width: 100%;
}

@media only screen and (max-width: 600px) {
    .iconButton{
        margin: 0 0 0 1rem;
    }
}

</style>