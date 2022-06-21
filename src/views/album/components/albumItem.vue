<template>
	<div class="album_item">
		<div class="cover" @click="tapAlbum">
			<img :src="albumData.coverUrl + '?param=140y140'" alt="">
		</div>
		<div class="albumName">{{ albumData.albumName }}</div>
		<div class="artistName">{{ albumData.artistName }}</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'
	import { albumDataInterface } from '@/types/public/album'
	const router = useRouter()
	interface Props{
		albumData: albumDataInterface
	}
	const props = withDefaults(defineProps<Props>(), {
		albumData: () => { return {
			albumId: 0,
			albumName: '',
			coverUrl: '',
			price: 0,
			artistName: ''
		} }
	})
	function tapAlbum() {
		router.push({
			path: '/albumDetail',
			query: {
				id: props.albumData.albumId
			}
		})
	}
</script>

<style scoped lang="less">
	.album_item{
		padding: 15px;
		box-sizing: border-box;
		width: 100%;
		.cover{
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			background: var(--my-back-color-gray);
			position: relative;
			border-radius: 10px;
			img{
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				border-radius: 10px;
			}
		}
		.albumName{
			font-size: 30px;
			color: var(--my-text-color-black);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			margin-top: 10px;
		}
		.artistName{
			font-size: 28px;
			color: var(--my-text-color-gray);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>