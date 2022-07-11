<template>
	<div class="song_list_item">
		<div class="cover" @click="goDetail">
			<img class="cover_img" :src="sheetData.coverImgUrl + '?param=140y140'" alt="" v-lazy="sheetData.coverImgUrl + '?param=140y140'">
			<div class="play_count">
				<i class="iconfont icon-bofang"></i>
				<div>{{ formatCountNumber(sheetData.playCount) }}</div>
			</div>
		</div>
		<div class="song_list_title text_over_two_lines">{{ sheetData.name }}</div>
	</div>
</template>

<script setup lang="ts">
	import type { SheetDataFace } from '@/types/public'
	import { formatCountNumber } from '@/utils'
	import { useRouter } from 'vue-router'
	const router = useRouter()
	interface Props {
		sheetData: SheetDataFace
	}
	const props = withDefaults(defineProps < Props > (), {
		sheetData: () => {
			return {
				coverImgUrl: '',
				tags: [],
				updateTime: 0,
				name: '',
				playCount: 0,
				id: 0
			}
		}
	})
	function goDetail() {
		router.push({
			path: '/songSheetDetail',
			query: { id: props.sheetData.id }
		})
	}
</script>

<style scoped lang="less">
	.song_list_item {
		width: 100%;
		flex-shrink: 0;
		padding: 20px;
		box-sizing: border-box;
		.cover{
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			border-radius: 20px;
			position: relative;
			margin: auto;
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
			position: absolute;
		}
		.song_list_title {
			color: var(--my-text-color-black);
			font-size: 24px;
			margin: auto;
			margin-top: 5px;
			width: 100%;
		}
	}
</style>
