<!-- 推荐新歌 -->
<template>
	<div class="newSong" @touchmove="(e) => e.stopPropagation()">
		<div class="top">
			<div class="recomend_title">新歌推荐</div>
			<van-button icon="play" round size="mini" @click="playAll">播放</van-button>
		</div>
		<van-skeleton title :row="1" :loading="loading">
			<swiper :slides-per-view="1.2" :space-between="20" navigation :pagination="{ clickable: true }"
				:scrollbar="{ draggable: true }">
				<swiper-slide v-for="(item, index) in list" :key="index">
					<new-song-item :song-data="data" v-for="data in item" :key="data.id" />
				</swiper-slide>
			</swiper>
		</van-skeleton>
	</div>
</template>

<script setup lang="ts">
	import { usePlayerStore } from '@/store'
	import {
		reqRecommendNewSongs
	} from '@/api/home'
	import {
		ref, defineExpose, toRaw
	} from 'vue'
	import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js"
	import "swiper/swiper.min.css";	
	import NewSongItem from './newSongItem.vue'
	import { songData } from '@/types/public'
	const list = ref<Array<Array<songData>>>([])
	const songList = ref<Array<songData>>([])
	const playerStore = usePlayerStore()
	const loading = ref<boolean>(false)
	
	function getList() {
		loading.value = true
		reqRecommendNewSongs({ limit: 12 })
			.then(res => {
				const { data } = res
				// eslint-disable-next-line
				const tempList: Array<any> = []
				const len = data.result.length
				songList.value = data.result
				for(let i = 0;i < len; i++) {
					const l = Math.floor(i / 2)
					if (!tempList[l]) {
						tempList[l] = []
					}
					tempList[l].push(data.result[i])
				}
				list.value = tempList
			})
			.finally(() => {
				loading.value = false
			})
	}
		
	function playAll() {
		const list = toRaw(songList.value)
		const newlist = list.map((item: songData) => {
			return {
				dt: item.song.duration,
				url: '',
				name: item.song.name,
				id: item.song.id,
				ar: item.song.artists,
				al: item.song.album
			}
		})
		console.log(newlist)
		playerStore.resetList(newlist)
	}	
		
	getList()

	
	defineExpose({
		getList
	})
</script>

<style scoped lang="less">
	.newSong{
		margin-top: 20px;
		background: var(--van-white);
		padding: 15px;
		.top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;
			.recomend_title{
				font-size: 30px;
				font-weight: bold;
				color: var(--my-text-color-black);
			}
		}
	}
</style>
