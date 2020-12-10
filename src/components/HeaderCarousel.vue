<template>
<header>
    <div class="carouselContainer">
        <img class="carouselImages" :key="img + Math.random()" :src="img" v-for="img in info.carouselImages">
    </div>

    <div class="headerContent">
        
        <h1 :class="info.title.class">{{info.title.text}}</h1>
        <h2 v-if="info.subtitle" :class="info.subtitle.class">{{info.subtitle.text}}</h2>
        <p  v-if="info.description" :class="info.description.class">{{info.description.text}}</p>
        
        <div v-if="buttonList" class="buttonContainer">
            <button 
                :key="buttonList.indexOf(btn)" 
                v-for="btn in buttonList" 
                :class="btn.class" 
                @click="btn.btnFunction"
            > 
                {{btn.text}} 
            </button>
            
        </div>
    
    </div>
</header>
</template>

<script>
export default {
    props: {
        info: {
            title: {type: Object, required: true},
            subtitle: {type: Object, required: false},
            description: {type: String, required: false},

            buttons: {type: Array, required: false},

            carouselImages: {type: Array, required: true}
        }
    },

    data: () => {
        return {
            buttonList: false,
            slideIndex: -1
        }
    },

    methods: {
        setUpCarousel(){
            let imageList = this.info.carouselImages;

            imageList.push(imageList[0]);

            this.info.carouselImages = imageList;
        },

        resetCarousel(imageList){
            imageList.forEach(image => {
                image.style.transition = 'none';
                image.style.transform = 'translateX(0vw)';            
            });

            this.slideIndex = 0;
        },
        
        runCarousel(){
            const imageList = document.getElementsByClassName('carouselImages');

            this.slideIndex++;

            imageList.forEach(image => {
                image.style.transition = 'transform 0.4s ease-in-out';              
                image.style.transform = 'translateX(' + -(this.slideIndex * 100) + 'vw)';
            });

            if(this.slideIndex >= imageList.length) 
                this.resetCarousel(imageList);

            setTimeout(() => this.runCarousel(), 4000)
        }
    },

    mounted() {
        this.buttonList = this.info.buttons.slice(0, 5);

        this.setUpCarousel();
        //this.runCarousel();
    }

}
</script>

<style lang="scss" scoped>

header{
	min-height: 100vh;

	position: relative;
	text-align: center;

	scroll-snap-align: start;
    
	.carouselContainer{
		display: flex;
        overflow: hidden;
        
        background: black;

		img{
            @include fullscreenCover;

            object-fit: cover;
            filter: blur(8px) brightness(75%);

            transition: .5s;
        }
        
		&::-webkit-scrollbar{
			height: 0;
		}
	}

	.headerContent{
		position: absolute;
		left: 50%;
		top: 50%;

        transform: translate(-50%,-50%);
    }

    @media (max-width: 800px) {
        .buttonContainer{
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }    
    }
}
</style>
