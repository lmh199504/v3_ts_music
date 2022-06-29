<template>
	<div class="album_item" @click="toVideoDetail">
		<div class="cover">
			<img :src="videoData.coverUrl + '?param=140y140'" alt="">
			<!-- <video src=""></video> -->
		</div>
		<div class="info">
			<div class="album_name">{{ videoData.title }}</div>
			<div class="singer">{{ videoData.creator.userName }}</div>
			<div class="singer">{{ videoData.playTime }}播放</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { VideoInterface } from '@/types/public/video'
	import { useRouter } from 'vue-router'
	interface Props{
		videoData: VideoInterface
	}
	const router = useRouter()
	const props = withDefaults(defineProps<Props>(), {
		videoData: () => {
			return {
				title: '',
				coverUrl: '',
				vid: 0,
				durationms: 0,
				playTime: 0,
				type: 0,
				creator: {
					userId: 0,
					userName: ''
				}
			}
		}
	})

	function toVideoDetail() {
		if (props.videoData.type == 1) {
			router.push({
				path: '/videoDetail',
				query: {
					id: props.videoData.vid
				}
			})
		} else if (props.videoData.type == 0) {
			router.push({
				path: '/videoDetail',
				query: {
					id: props.videoData.vid,
					type: 'MV'
				}
			})
		}
	}


</script>

<style scoped lang="less">
	.album_item{
		display: flex;
		padding: 15px;
		align-items: center;
		overflow: hidden;
		.cover{
			width: 250px;
			height: 150px;
			margin-right: 20px;
			img{
				width: 100%;
				height: 100%;
				border-radius: 10px;
				object-fit: cover;
			}
		}
		.info{
			flex: 1;
			.album_name{
				color: var(--my-text-color-black);
				font-size: 30px;
			}
			.singer{
				font-size: 24px;
				color: var(--my-text-color-gray);
			}
		}
	}
</style>