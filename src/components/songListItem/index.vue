<template>
	<div class="song_list_item">
		<div class="cover">
			<img class="cover_img" :src="songListData.picUrl" alt="">
			<div class="play_count">
				<i class="iconfont icon-bofang"></i>
				<div>{{ formatCountNumber(songListData.playCount) }}</div>
			</div>
		</div>
		<div class="song_list_title text_over_two_lines">{{ songListData.name }}</div>
	</div>
</template>

<script setup lang="ts">
	import { songListFace } from '@/types/public'
	import { formatCountNumber } from '@/utils'
	interface Props {
		songListData: songListFace
	}
	// eslint-disable-next-line 
	const props = withDefaults(defineProps < Props > (), {
		songListData: {}
	})
	// console.log(props)
</script>

<style scoped lang="less">
	.song_list_item {
		width: 220px;
		flex-shrink: 0;
		.cover{
			width: 200px;
			height: 200px;
			border-radius: 20px;
			position: relative;
			.play_count{
				position: absolute;
				top: 15px;
				right: 15px;
				color: var(--my-text-color-white);
				font-size: 28px;
				background: rgba(0, 0, 0, 0.2);
				padding: 2px 5px;
				border-radius: 8px;
				display: flex;
				align-items: center;
				.iconfont{
					margin-right: 5px;
				}
			}
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
