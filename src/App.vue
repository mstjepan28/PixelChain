<template>
<div>
	<Navbar/>

	<router-view/>

	<footer> @ 2020 by Lorem Ipsum </footer>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
	components: { Navbar },
}
</script>

<style lang="scss" scoped>
footer{
	padding: 1rem;
	
	color: white;
	text-align: center;

	background: $DarkGray;
}
</style>
