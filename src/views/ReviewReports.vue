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
import { mapGetters } from "vuex";
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
    computed: {
        ...mapGetters("drizzle", ["drizzleInstance"]),
    },
    methods:{
        async checkState(){
			// Dohvati trenutno stanje inicijalizacije drizzle
			let state = this.drizzleInstance.store.getState();

			// Ako drizzle nije inicijaliziran, pricekaj 500ms i ponovno provjeri. Petlja se izvrsava
			// sve dok se drizzle ne inicijalizira
			while(!state.drizzleStatus.initialized){
				const delay = new Promise(resolve => setTimeout(resolve, 500));
				await delay;

				state = this.drizzleInstance.store.getState();
			}
		},
        async addVote(vote, report){
            const result = await this.drizzleInstance.contracts.IPFSImageStore.methods.checkVoter(report).call();
            if(result){
                this.drizzleInstance.contracts.IPFSImageStore.methods.voteReport.cacheSend(report, vote);
                return true;
            }else{
                return false;
            }

        },
        async getReports(){
            this.reports = store.reports;
            console.log(this.reports)
            if(this.reports.length == 0){
                const result = await this.drizzleInstance.contracts.IPFSImageStore.methods.getReports().call();
                for(const e of result){
                    if(e.endDate != "0"){
                        const res1 = await fetch(`http://127.0.0.1:8080/ipfs/${e.reported_cid}/`);
                        const res2 = await fetch(`http://127.0.0.1:8080/ipfs/${e.original_cid}/`);

                        let reportedImg = await res1.text();
                        let originalImg = await res2.text();

                        let report = {
                            id: e.ID,
                            reportedImg: reportedImg,
                            matchingImg: originalImg,
                            description: e.Description,
                            reportedDate: e.startDate*1000,
                            reportEndDate: e.endDate*1000,
                        }
                        
                        this.reports.push(report);
                    }
                }
            }    
        }
    },
    async mounted(){
        await this.checkState();
        this.getReports();
    }
}
</script>

<style lang="scss" scoped>
.reviewReport{
    margin-top: 5rem;
}
</style>