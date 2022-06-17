<template>
	<div class="suggest">
		<Banner />
		<Recommend />
	</div>
</template>

<script setup lang="ts">
	import Banner from './banner.vue'
	import Recommend from './recommend.vue'
</script>

<style scoped lang="less">
	.suggest{
		padding: 0 20px 20px 20px;
	}
</style>