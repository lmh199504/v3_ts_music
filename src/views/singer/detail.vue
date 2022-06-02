<template>
	<MiniPlayOut>
		<div class="singer_detail">
			<van-nav-bar left-arrow fixed placeholder :title="artist.name || '歌手详情'" @click-left="onClickLeft"></van-nav-bar>
			<ScrollBanner ref="scrollRef">
				<template #btn>
					<div class="top_content" v-if="artist.cover">
						<img :src="artist.cover+'?param=500y500'" alt="">
					</div>
				</template>
				<div class="container">
					<div class="box_container user_info">
						<div class="user_img">
							<img v-if="artist.cover" :src="artist.cover+'?param=60y60'" alt="">
						</div>
						<div class="singer_name">{{ artist.name }}</div>
						<div class="fansCnt">{{ formatCountNumber(fansData.fansCnt) }}粉丝</div>
						<div class="btn_wrapper">
							<van-button size="small" block :loading="loading" round v-if="!fansData.isFollow" @click="subSinger(1)">关注</van-button>
							<van-button size="small" block :loading="loading" round v-else @click="subSinger(0)">取消</van-button>
						</div>
					</div>
					
					<div class="box_container main_page">
						<div class="big_title">艺人百科</div>
						<div class="main_page_line">
							<div>艺人名：</div>
							<div>{{ artist.name }}</div>
						</div>
						<div class="main_page_line">
							<div>身份：</div>
							<div>{{ identify }}</div>
						</div>
						<div class="main_page_line">
							<div>简介：</div>
							<div>{{ artist.briefDesc }}</div>
						</div>
					</div>
					
					<div class="box_container hot_song">
						<div class="big_title">
							<div>热门歌曲</div>
							<div>
								<van-button round size="small" @click="playAll" style="margin-right: 15px;">播放全部</van-button>
								<van-button round size="small">更多</van-button>
							</div>
						</div>
						
						<div class="">
							<SongItem v-for="item in hotList" :key="item.id" :song-data="item" />
						</div>
					</div>
				</div>
			</ScrollBanner>	
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import { reactive, ref, Component, nextTick, toRaw } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import ScrollBanner from '@/components/Scroll/scrollBanner'
	import { reqSingerDetail, reqSingerDesc, reqSingerFans, reqSubSinger, reqSingHotSongs } from '@/api/singer'
	import { Toast } from 'vant'
	import { formatCountNumber } from '@/utils'
	import SongItem from '@/components/songItem'
	import { usePlayerStore } from '@/store'
	
	const playerStore = usePlayerStore()
	const hotList = ref([])
	const loading = ref<boolean>(false)
	const fansData = reactive({
		fansCnt: 0,
		follow: false,
		followCnt: 0,
		followDay: '',
		isFollow: false
	})
	const identify = ref<string>('') // 身份
	const scrollRef = ref<Component>(null)
	const router = useRouter()
	const route = useRoute()
	const artist = reactive({
		name: '',
		id: '',
		cover: '',
		briefDesc: '',
		albumSize: ''
	})
	function onClickLeft() :number {
		router.back()
	}
	// 歌手详情
	function getSingerDetail() :void {
		const { id } = route.query
		const loading = Toast.loading({
			duration: 0,
			message: '加载中...',
			overlay: true
		})
		reqSingerDetail({ id })
		.then(res => {
			const resArtist = res.data.data.artist
			for(const key in resArtist) {
				artist[key] = resArtist[key]
			}
			nextTick(() => {
				scrollRef.value.refresh()
			})
			identify.value = res.data.data.identify.imageDesc
		})
		.finally(() => {
			loading.clear()
		})
	}
	// 歌手介绍
	function getSingerDesc() :void {
		const { id } = route.query
		reqSingerDesc({ id })
		.then(res => {
			console.log(res)
		})
	}
	// 歌手粉丝
	function genFans() :void {
		const { id } = route.query
		reqSingerFans({ id })
		.then(res => {
			const resFans = res.data.data
			for(const key in fansData) {
				fansData[key] = resFans[key]
			}
		})
	}
	// 关注
	function subSinger(t: number) :void {
		const data = {
			t: t,
			id: route.query.id
		}
		loading.value = true
		reqSubSinger(data)
		.then(() => {
			if (t === 1) {
				Toast.success('关注成功')
				fansData.isFollow = true
			} else {
				Toast.success('取消成功')
				fansData.isFollow = false
			}
		})
		.finally(() => {
			loading.value = false
		})
	}
	// 歌曲
	function getSingHotSongs() {
		const { id } = route.query
		reqSingHotSongs({ id })
		.then(res => {
			hotList.value = res.data.songs
			nextTick(() => {
				scrollRef.value.refresh()
			})
		})
	}
	// 播放全部
	function playAll() {
		console.log(toRaw(hotList.value))
		playerStore.resetList(toRaw(hotList.value))
	}
	
	getSingerDetail()
	getSingerDesc()
	genFans()
	getSingHotSongs()
</script>

<style scoped lang="less">
	.singer_detail{
		height: 100%;
		overflow: hidden;
		.top_content{
			width: 100%;
			height: 100%;
			img{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.container{
			background: var(--my-back-color-gray);
			padding: 30px;
			position: relative;
			// min-height: 100%;
			.box_container{
				background: var(--my-back-color-white);
				border-radius: 20px;
				padding: 20px;
				margin-bottom: 20px;
				.big_title{
					font-size: 36px;
					color: var(--my-text-color-black);
					margin-bottom: 20px;
					display: flex;
					justify-content: space-between;
				}
			}
			.user_info{
				position: relative;
				.user_img{
					width: 120px;
					height: 120px;
					margin: auto;
					background: #f2f2f2;
					border-radius: 50%;
					img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.singer_name{
					text-align: center;
					color: var(--my-text-color-black);
					font-size: 30px;
					margin-top: 20px;
				}
				.fansCnt{
					text-align: center;
					font-size: 28px;
					margin-top: 10px;
					color: var(--my-text-color-gray);
				}
				.btn_wrapper{
					:deep(.van-button){
						width: 120px;
						margin: auto;
						margin-top: 20px;
					}
				}
			}
			.main_page_line{
				display: flex;
				margin-bottom: 15px;
				font-size: 28px;
				color: var(--my-text-color-gray);
				flex-wrap: wrap;
				text-align: justify;
			}
		}
	}
</style>