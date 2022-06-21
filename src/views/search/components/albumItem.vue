<template>
	<div class="album_item" @click="tapAlbum">
		<div class="cover">
			<img :src="albumData.picUrl + '?param=140y140'" alt="">
		</div>
		<div class="info">
			<div class="album_name">{{ albumData.name }}</div>
			<div class="singer">{{ singer }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'
	import { computed, ComputedRef } from 'vue'
	import { AlbumInterface } from '@/types/public/comprehensive'
	interface Props{
		albumData: AlbumInterface
	}
	const router = useRouter()
	const props = withDefaults(defineProps<Props>(), {
		albumData: () => {return {
			name: '',
			picUrl: '',
			id: 0,
			artists: []
		}}
	})
	const singer: ComputedRef<string> = computed(() => {
		return props.albumData.artists.map(item => { return item.name }).join('/')
	})
	
	function tapAlbum() {
		router.push({
			path: '/albumDetail',
			query: {
				id: props.albumData.id
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