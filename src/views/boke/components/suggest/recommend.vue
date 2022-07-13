<template>
	<div class="">
		<van-skeleton title :row="3" :loading="loading">
			<RecommendItem v-for="item in recommendList" :key="item.categoryId" :list="item" :box-type="Math.random() > 0.5 ? BoxType.box : BoxType.line" />
		</van-skeleton>
	</div>
</template>

<script lang="ts" setup>
	import { reqCategoryRecommend } from '@/api/dj'
	import { BoxType } from '@/types/public'
	import RecommendItem from './recommendItem.vue'
	import type { DjCategoryRecommend } from '@/types/public/dj'
	import { ref } from 'vue'
	const recommendList = ref<DjCategoryRecommend[]>([])
	const loading = ref<boolean>(false)
	function getRecommend() {
		loading.value = true
		reqCategoryRecommend()
		.then(res => {
			recommendList.value = res.data.data
		})
		.finally(() => {
			loading.value = false
		})
	}
	
	getRecommend()
</script>

<style>
</style>