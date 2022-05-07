<template>
	<div class="wrapper">
		<div class="newSongItem">
			<div class="left">
				<div class="cover">
					<img class="cover_img" :src="songData.picUrl" alt="">
					<i class="iconfont icon-24gf-play"></i>
				</div>
				<div class="song_info">
					<div>
						<span class="song_name">{{ songData.name }}</span>
						<span class="singer">- {{ singerName }}</span>
					</div>
					<!-- <div class="desc">你有很多故事 可我却从未参与其中可我却从未参与其中</div> -->
				</div>
			</div>
			<div class="right flex_box_center_column">
				<i class="iconfont icon-24gf-play"></i>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { songData as songDataInterface } from '@/types/public'
	interface Props{
		songData: songDataInterface
	}
	// eslint-disable-next-line
	const props = withDefaults(defineProps < Props > (), {
		songData: (): songDataInterface => { return {} }
	})
	const singerName = computed(() => {
		if (props.songData.song.artists) {
			return props.songData.song.artists.map(item => item.name).join('/')
		} 
		return '-'
	})
</script>

<style scoped lang="less">
	.wrapper{
		padding: 20px;
	}
	.newSongItem{
		border-bottom: 2px solid #f5f6f8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		width: 100%;
		overflow: hidden;
		.left{
			display: flex;
			align-items: center;
			.cover{
				position: relative;
				height: 80px;
				width: 80px;
				border-radius: 10px;
				flex-shrink: 0;
				margin-right: 20px;
				.cover_img{
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}
				.iconfont{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					color: #fff;
					font-size: 24px;
				}
			}
			.song_info{
				font-size: 24px;
				flex: 1;
				overflow: hidden;
			}
			.song_name{
				font-size: 28px;
				color: #000;
				margin-right: 10px;
			}
			.singer{
				font-size: 24px;
				color: #999;
			}
			.desc{
				width: 100%;
				font-size: 20px;
				color: #999;
				overflow: hidden;
				white-space: nowrap;
				max-width: 350px;
				text-overflow: ellipsis;
			}
		}
		.right{
			flex-shrink: 0;
			color: #999;
			border: 2px solid #999;
			height: 40px;
			width: 40px;
			border-radius: 10px;
			.iconfont{
				font-size: 24px;
			}
		}
	}
</style>