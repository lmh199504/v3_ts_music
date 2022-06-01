<template>
	<div class="min-play-out">
		<slot></slot>
		<div class="mini_player" :class="{ 'hide_player': !currentSong.id }">
			<MiniPlayer />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia'
	import { usePlayerStore } from '@/store'
	import MiniPlayer from '@/components/MiniPlayer'
	const playerStore = usePlayerStore()
	const { currentSong } = storeToRefs(playerStore)
</script>

<style scoped>
	.min-play-out{
		padding-bottom: 110px;
		height: 100vh;
		box-sizing: border-box;
		background-color: var(--my-back-color-white);
	}
	.mini_player{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.4s ease;
		z-index: 10;
	}
	.hide_player{
		bottom: -120px;
	}
</style>