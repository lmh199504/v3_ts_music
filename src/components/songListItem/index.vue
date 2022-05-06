<template>
	<div class="song_list_item">
		<div class="cover">
			<img class="cover_img" :src="songListData.picUrl" alt="">
		</div>
		<div class="song_list_title text_over_two_lines">{{ songListData.name }}</div>
	</div>
</template>

<script setup lang="ts">
	import { songListFace } from '@/types/public'
	interface Props {
		songListData: songListFace
	}
	const props = withDefaults(defineProps < Props > (), {
		songListData: {}
	})
	console.log(props)
</script>

<style scoped lang="less">
	.song_list_item {
		width: 220px;
		flex-shrink: 0;
		.cover{
			width: 200px;
			height: 200px;
			border-radius: 20px;
		}
		.cover_img{
			width: 100%;
			height: 100%;
			border-radius: 20px;
		}
		.song_list_title {
			font-size: 24px;
			margin-top: 5px;
			width: 200px;
		}
	}
</style>
