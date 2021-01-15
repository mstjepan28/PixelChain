<template>
<div class="reviewReport">
    <div>
        <hr class="PurpleLine"/> <InfoBox :info="reviewReport"/> <hr class="PurpleLine"/>
    </div>

    <div>
        <ReviewReport :key="report.id" :info="report" v-for="report in reports"/>
    </div>
</div>
</template>

<script>

import store from '@/store.js';
import InfoBox from '../components/InfoBox.vue';
import ReviewReport from '@/components/reviewReportComp.vue';
import { mapGetters } from "vuex";
export default {
    components: { InfoBox, ReviewReport },
    data(){
        return{
            id: this.$route.params.id,
            reviewReport: {title: "Review report", text: store.placeholderText },

            reports: false,
        }
    },
     computed: {
        ...mapGetters("drizzle", ["drizzleInstance"]),
    },
    methods:{
        getReports(){
            this.reports = store.reports;
        }
    },
    async mounted(){
        this.getReports(await this.drizzleInstance.contracts.IPFSImageStore.methods);
        console.log()
        if(this.drizzleInstance){
            let res = await this.drizzleInstance.contracts.IPFSImageStore.methods.get().call();
            console.log(res);
        }
    }
}
</script>

<style lang="scss" scoped>
.reviewReport{
    margin-top: 5rem;
}
</style>