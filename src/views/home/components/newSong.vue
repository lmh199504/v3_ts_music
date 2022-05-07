<!-- 推荐新歌 -->
<template>
	<div class="newSong" @touchmove="(e) => e.stopPropagation()">
		<div class="top">
			<div class="recomend_title">新歌推荐</div>
			<van-button icon="play" round size="mini" >播放</van-button>
		</div>
		<swiper :modules="modules" :slides-per-view="1.2" :space-between="20" navigation :pagination="{ clickable: true }"
			:scrollbar="{ draggable: true }">
			<swiper-slide v-for="(item, index) in list" :key="index">
				<new-song-item :song-data="data" v-for="data in item" :key="data.id" />
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup lang="ts">
	import {
		reqRecommendNewSongs
	} from '@/api/home'
	import {
		ref
	} from 'vue'
	import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js"
	import "swiper/swiper.min.css";	
	import NewSongItem from './newSongItem'
	import { songData } from '@/types/public'
	const list = ref<Array<Array<songData>>>([])
	reqRecommendNewSongs({ limit: 12 })
		.then(res => {
			const tempList = []
			const len = res.result.length
			for(let i = 0;i < len; i++) {
				const l = Math.floor(i / 2)
				if (!tempList[l]) {
					tempList[l] = []
				}
				tempList[l].push(res.result[i])
			}
			list.value = tempList
		})
</script>

<style scoped lang="less">
	.newSong{
		margin-top: 20px;
		background: #fff;
		padding: 15px;
		.top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;
			.recomend_title{
				font-size: 30px;
				font-weight: bold;
			}
		}
	}
</style>
