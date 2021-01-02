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

export default {
    components: { InfoBox, ReviewReport },
    data(){
        return{
            id: this.$route.params.id,
            reviewReport: {title: "Review report", text: store.placeholderText },

            reports: false,
        }
    },
    methods:{
        getReports(){
            this.reports = store.reports;
        }
    },
    mounted(){
        this.getReports();
    }
}
</script>

<style lang="scss" scoped>
.reviewReport{
    margin-top: 5rem;
}
</style>