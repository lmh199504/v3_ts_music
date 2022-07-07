<template>
	<div class="playList">
		<SongItem v-for="item in playList" :key="item.id" :song-data="item" :showdel="false" />
	</div>
</template>
<script setup lang="ts">
	import { storeToRefs } from 'pinia'
	import { usePlayerStore } from '@/store'
	import SongItem from '@/components/songItem/index.vue'
	const playerStore = usePlayerStore()
	const { playList } = storeToRefs(playerStore)
</script>
<style scoped lang="less">
	.playList{
		width: 80vw;
		height: 800px;
		padding: 20px;
	}
</style>