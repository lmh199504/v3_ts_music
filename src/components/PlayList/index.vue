<template>
	<div class="playList">
		<SongItem v-for="item in playList" :key="item.id" :song-data="item" />
	</div>
</template>
<script setup lang="ts">
	import { ref, Component, nextTick } from 'vue'
	import Scroll from '@/components/Scroll'
	import { storeToRefs } from 'pinia'
	import { usePlayerStore } from '@/store'
	import SongItem from '@/components/songItem'
	const playerStore = usePlayerStore()
	const { playList } = storeToRefs(playerStore)
	const screllRef = ref<Component>()
	nextTick(() => {
		screllRef.value.refresh()
	})
</script>
<style scoped lang="less">
	.playList{
		width: 80vw;
		height: 800px;
		padding: 20px;
	}
</style>