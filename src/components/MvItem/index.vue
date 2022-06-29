<template>
	<div class="album_item" @click="tapAlbum">
		<div class="cover">
			<img :src="mvData.cover + '?param=140y140'" alt="">
		</div>
		<div class="info">
			<div class="album_name">{{ mvData.name }}</div>
			<div class="singer">{{ mvData.artistName }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'
	import type { MvInterface } from '@/types/public/mv'
	interface Props{
		mvData: MvInterface
	}
	const router = useRouter()
	const props = withDefaults(defineProps<Props>(), {
		mvData: () => { return{
			id: 0,
			cover: '',
			name: '',
			playCount: 0,
			artistName: '',
			artistId: 0
		} }
	})
	function tapAlbum() {
		router.push({
			path: '/videoDetail',
			query: {
				id: props.mvData.id,
				type: 'MV'
			}
		})
	}
</script>

<style scoped lang="less">
	.album_item{
		display: flex;
		padding: 15px;
		align-items: center;
		overflow: hidden;
		.cover{
			width: 100px;
			height: 100px;
			margin-right: 20px;
			img{
				width: 100%;
				height: 100%;
				border-radius: 10px;
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