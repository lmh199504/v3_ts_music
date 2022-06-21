<template>
	<div class="wrapper">
		<div class="newSongItem">
			<div class="left">
				<div class="cover">
					<img class="cover_img" :src="songData.picUrl+'?param=140y140'" alt="">
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
				<i class="iconfont icon-24gf-play" @click="playThis"></i>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { usePlayerStore } from '@/store'
	import { computed } from 'vue'
	import type { songData as songDataInterface } from '@/types/public'
	import type { arData} from '@/types/store/player'
	const playerStore = usePlayerStore()
	interface Props{
		songData: songDataInterface
	}
	
	const props = withDefaults(defineProps < Props > (), {
		songData: (): songDataInterface => { return {
			alg: '',
			canDislike: false,
			copywriter: '',
			id: 0,
			name: '',
			picUrl: '',
			// eslint-disable-next-line
			song: {},
			trackNumberUpdateTime: 0,
			type: 0
		} }
	})
	const singerName = computed(() => {
		if (props.songData.song.artists) {
			return props.songData.song.artists.map((item: arData) => item.name).join('/')
		} 
		return '-'
	})
	function playThis() {
		const data = {
			dt: props.songData.song.duration,
			url: '',
			name: props.songData.song.name,
			id: props.songData.song.id,
			ar: props.songData.song.artists,
			al: props.songData.song.album
		}
		playerStore.setCurSong(data)
	}
	
</script>

<style scoped lang="less">
	.wrapper{
		padding: 20px;
	}
	.newSongItem{
		border-bottom: 2px solid var(--van-gray-3);
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
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 24px;
				flex: 1;
				padding-right: 10px;
				overflow: hidden;
				max-width: 300px;
			}
			.song_name{
				font-size: 28px;
				color: #000;
				margin-right: 10px;
				color: var(--my-text-color-black);
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