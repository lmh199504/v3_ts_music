<template>
	<div class="song-item">
		<div class="left">
			<img class="left_al_img" :src="songData.al.picUrl + '?param=140y140'" alt="" v-lazy="songData.al.picUrl + '?param=140y140'">
		</div>
		<div class="center">
			<div class="song-name">{{ songData.name }}</div>
			<div class="singer">{{ singer }}</div>
		</div>
		<div class="right">
			<i class="iconfont icon-24gf-play" @click="playThis"></i>
			<i class="iconfont icon-Androidgengduo"></i>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, toRaw } from 'vue'
	import { usePlayerStore } from '@/store'
	const playerStore = usePlayerStore()
	const props = defineProps(['songData'])
	const singer = computed(() => {
		if (props.songData?.ar) {
			return props.songData.ar.map(item => item.name).join('/')
		}
		return ''
	})
	
	function playThis() {
		playerStore.setCurSong(toRaw(props.songData))
	}
	
	// const cover = computed(() => {
	// 	if (props.songData?.al?.picUrl) {
	// 		return props.songData.al.picUrl 
	// 	} else {
	// 		return ''
	// 		// `https://p1.music.126.net/rYXihk9-kGWijs5vJpm0iw==/${ props.songData?.al?.id }.jpg?param=140y140`
	// 	}
	// })
	
</script>

<style scoped lang="less">
	.song-item{
		display: flex;
		.left{
			margin-right: 10px;
			.left_al_img{
				width: 80px;
				height: 80px;
				border-radius: 20px;
				padding: 10px;
			}
		}
		.center{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			.song-name{
				font-size: 26px;
				color: var(--my-text-color-black);
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 450px;
				white-space: nowrap;
			}
			.singer{
				color: var(--my-text-color-gray);
				font-size: 24px;
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 450px;
				white-space: nowrap;
			}
		}
		.right{
			.iconfont{
				color: var(--my-text-color-gray);
				padding-left: 20px;
				font-size: 28px;
			}
		}
	}
</style>