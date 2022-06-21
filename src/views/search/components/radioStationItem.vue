<template>
	<div class="user_item">
		<div class="left">
			<div class="coverImg">
				<img :src="radioData.picUrl + '?param=140y140'" alt="">
			</div>
			<div>
				<div class="singer_name">{{ radioData.name }}</div>
				<div class="info">{{ radioData.programCount }}个声音、播放{{ radioData.programCount }}次、by{{ radioData.dj.nickname }}</div>
			</div>
		</div>
		<div class="right">
			
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { RadioInterface } from '@/types/public/radio'
	interface Props{
		radioData: RadioInterface
	}
	withDefaults(defineProps<Props>(), {
		radioData: () => { return {
			id: 0,
			programCount: 0,
			name: '',
			picUrl: '',
			playCount: 0,
			dj: {
				nickname: '',
				userId: 0,
				avatarUrl: '',
				followed: false
			}
		}}
	})

	
</script>

<style scoped lang="less">
	.user_item{
		padding: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--van-cell-border-color);
		.left{
			display: flex;
			align-items: center;
			.coverImg{
				flex-shrink: 0;
				width: 100px;
				height: 100px;
				overflow: hidden;
				border-radius: 10px;
				margin-right: 20px;
				img{
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.singer_name{
				font-size: 28px;
				color: var(--my-text-color-black);
			}
			.info{
				font-size: 24px;
				color: var(--my-text-color-gray);
			}
		}
	}
</style>