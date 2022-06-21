<template>
	<div class="dateList">
		<SongItem v-for="item in songList" :key="item.id" :song-data="item" />
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { reqHistoryRecommend } from '@/api/home'
	import type { SongData } from '@/types/store/player'
	import SongItem from '@/components/songItem/index.vue'
	import { Toast } from 'vant'
	interface Props{
		date: string
	}
	const props = withDefaults(defineProps<Props>(), {
		date: ''
	})
	const songList = ref<SongData[]>([])
	
	const emit = defineEmits(['refresh'])
	function getList() {
		const loading = Toast.loading({
			duration: 0,
			message: '加载中...'
		})
		reqHistoryRecommend({ date: props.date })
		.then(res => {
			songList.value = res.data.data.songs
			emit('refresh')
		})
		.finally(() => {
			loading.clear()
		})
	}
	getList()
</script>

<style scoped lang="less">
	.dateList{
		background-color: var(--my-back-color-white);
		padding: 30px;
	}
</style>