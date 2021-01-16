<template>
<div class="reviewReport">
    <div>
        <hr class="PurpleLine"/> <InfoBox :info="reviewReport"/> <hr class="PurpleLine"/>
    </div>
    <img :key="img" v-for="img in this.imgArr" :src="img" style="width: 200px; height: 200px;"/>
    <div>
        <ReviewReport :key="report.id" :info="report" v-for="report in reports"/>
    </div>
</div>
</template>

<script>

import store from '@/store.js';
import InfoBox from '../components/InfoBox.vue';
import ReviewReport from '@/components/reviewReportComp.vue';
import ipfs from "../store/ipfs";
export default {
    components: { InfoBox, ReviewReport },
    data(){
        return{
            id: this.$route.params.id,
            reviewReport: {title: "Review report", text: store.placeholderText },
            ipfsService: ipfs,
            reports: false,
            arr: [],
            imgArr: [],
        }
    },
     
    methods:{
        getReports(){
            this.reports = store.reports;
        }
    },
    async mounted(){
        if(this.drizzleInstance){
            let res = await this.drizzleInstance.contracts.IPFSImageStore.methods.get().call();
            //let image = await this.ipfsService.get(res);
            console.log(res)
            this.arr = res.split(",");
        }

        this.arr.forEach(e => {
            fetch(`https://gateway.ipfs.io/ipfs/${e}/`)
            .then(response => response.text())
            .then(data => {
                this.imgArr.push(data);
            });
        });
        
        console.log(this.imgArr);
    }
}
</script>

<style lang="scss" scoped>
.reviewReport{
    margin-top: 5rem;
}
</style>