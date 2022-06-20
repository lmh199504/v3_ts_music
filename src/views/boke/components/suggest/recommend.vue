<template>
	<div class="">
		<RecommendItem v-for="item in recommendList" :key="item.categoryId" :list="item" :box-type="Math.random() > 0.5 ? BoxType.box : BoxType.line" />
	</div>
</template>

<script lang="ts" setup>
	import { reqCategoryRecommend } from '@/api/dj'
	import { BoxType } from '@/types/public'
	import RecommendItem from './recommendItem.vue'
	import type { DjCategoryRecommend } from '@/types/public/dj'
	import { ref } from 'vue'
	const recommendList = ref<DjCategoryRecommend[]>([])
	function getRecommend() {
		reqCategoryRecommend()
		.then(res => {
			recommendList.value = res.data.data
		})
	}
	
	getRecommend()
</script>

<style>
</style>