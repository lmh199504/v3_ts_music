<template>
	<div class="single_list box_white_container">
		<VideoItem v-for="item in list" :key="item.vid" :video-data="item"  />
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { reqSearchByType } from '@/api/search'
	import VideoItem from './videoItem.vue'
	import type { VideoInterface } from '@/types/public/video'
	interface Props{
		keyword: string;
		type: number
	}
	const props = withDefaults(defineProps<Props>(), {
		keyword: ''
	})
	const list = ref<Array<VideoInterface>>([])
	
	async function getData() {
		const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
		list.value = songList.data.result.videos
	}

	getData()
</script>

<style scoped lang="less">
	.single_list{
		background: var(--my-back-color-white);
	}
</style>