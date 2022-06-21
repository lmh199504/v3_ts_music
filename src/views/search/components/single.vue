<template>
	<div class="single_list box_white_container">
		<SongItem v-for="item in list" :key="item.id" :song-data="item" :showdel="false" />
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { reqSearchByType } from '@/api/search'
	import SongItem from '@/components/songItem/index.vue'
	import { reqSongDetail } from '@/api/song'
	import type { SongData } from '@/types/store/player'
	interface Props{
		keyword: string;
		type: number
	}
	const props = withDefaults(defineProps<Props>(), {
		keyword: ''
	})
	const list = ref<Array<SongData>>([])
	
	async function getData() {
		const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
		const params = {
			ids: songList.data.result.songs.map((item: SongData): number => { return item.id}).join(',')
		}
		const result = await reqSongDetail(params)
		list.value = result.data.songs
	}

	getData()
</script>

<style scoped lang="less">
	.single_list{
		background: var(--my-back-color-white);
	}
</style>