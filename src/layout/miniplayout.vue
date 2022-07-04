<template>
	<div class="min-play-out" :class="{ 'padding_out': currentSong.id }">
		<slot></slot>
		<div class="mini_player" :class="{ 'hide_player': !currentSong.id }">
			<MiniPlayer />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia'
	import { usePlayerStore } from '@/store'
	import MiniPlayer from '@/components/MiniPlayer/index.vue'
	const playerStore = usePlayerStore()
	const { currentSong } = storeToRefs(playerStore)
</script>

<style scoped>
	.min-play-out{
		height: 100vh;
		box-sizing: border-box;
		background-color: var(--my-back-color-white);
	}
	.padding_out{
		padding-bottom: 110px;
	}
	.mini_player{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.4s ease;
		z-index: 10;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background: var(--my-back-color-white);
	}
	.hide_player{
		bottom: -200px;
	}
</style>