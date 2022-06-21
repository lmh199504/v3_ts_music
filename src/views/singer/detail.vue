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
							</div>
						</div>
						<div class="">
							<SongItem v-for="item in hotList" :key="item.id" :song-data="item" />
							<van-button round size="small" @click="goAllSongs" block>查看更多</van-button>
						</div>
					</div>
					
					<div class="box_container ">
						<div class="big_title">热门专辑</div>
						<van-row>
							<van-col :span="8" v-for="item in albumList" :key="item.id">
								<SingerAlbumItem :album-data="item" />
							</van-col>
						</van-row>
					</div>
				</div>
			</ScrollBanner>	
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import { reactive, ref, nextTick, toRaw } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import ScrollBanner from '@/components/Scroll/scrollBanner.vue'
	import { reqSingerDetail, reqSingerDesc, reqSingerFans, reqSubSinger, reqSingHotSongs, reqSingerAlbum } from '@/api/singer'
	import { Toast } from 'vant'
	import { formatCountNumber } from '@/utils'
	import SongItem from '@/components/songItem/index.vue'
	import { usePlayerStore } from '@/store'
	import SingerAlbumItem from '@/components/SingerAlbumItem/index.vue'
	import { onClickLeft } from '@/utils/back' 
	import type { singerAlbumInterface } from '@/types/public/singer'
	import type { SongData } from '@/types/store/player'

	const playerStore = usePlayerStore()
	const hotList = ref<SongData[]>([])
	const loading = ref<boolean>(false)
	const fansData = reactive({
		fansCnt: 0,
		follow: false,
		followCnt: 0,
		followDay: '',
		isFollow: false
	})
	const identify = ref<string>('') // 身份
	const scrollRef = ref<InstanceType<typeof ScrollBanner>>()
	const router = useRouter()
	const route = useRoute()
	const artist = reactive({
		name: '',
		id: '',
		cover: '',
		briefDesc: '',
		albumSize: ''
	})
	const albumList = ref<singerAlbumInterface[]>([])
	
	// 歌手详情
	function getSingerDetail() :void {
		const { id } = route.query
		const loading = Toast.loading({
			duration: 0,
			message: '加载中...',
			overlay: true
		})
		reqSingerDetail({ id: Number(id) })
		.then(res => {
			const resArtist = res.data.data.artist
			// for(const key in resArtist) {
			// 	artist[key] = resArtist[key]
			// }
			artist.albumSize = resArtist.albumSize
			artist.briefDesc = resArtist.briefDesc
			artist.cover = resArtist.cover
			artist.id = resArtist.id
			artist.name = resArtist.name
			nextTick(() => {
				scrollRef.value?.refresh()
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
		reqSingerDesc({ id: Number(id) })
		.then(res => {
			console.log(res)
		})
	}
	// 歌手粉丝
	function genFans() :void {
		const { id } = route.query
		reqSingerFans({ id: Number(id) })
		.then(res => {
			const resFans = res.data.data
			// for(const key in fansData) {
			// 	fansData[key] = resFans[key]
			// }
			fansData.fansCnt = resFans.fansCnt
			fansData.follow = resFans.follow
			fansData.followCnt = resFans.followCnt
			fansData.followDay = resFans.followDay
			fansData.isFollow = resFans.isFollow
		})
	}
	// 关注
	function subSinger(t: number) :void {
		const data = {
			t: t,
			id: Number(route.query.id)
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
		reqSingHotSongs({ id: Number(id) })
		.then(res => {
			hotList.value = res.data.songs
			nextTick(() => {
				scrollRef.value?.refresh()
			})
		})
	}
	// 播放全部
	function playAll() {
		playerStore.resetList(toRaw(hotList.value))
	}
	// 获取歌手专辑
	function getAlbum() {
		reqSingerAlbum({
			id: Number(route.query.id)
		})
		.then(res => {
			albumList.value = res.data.hotAlbums
			nextTick(() => {
				scrollRef.value?.refresh()
			})
		})
	}
	
	function goAllSongs() {
		const { id } = route.query
		router.push({
			path: '/singerSongs',
			query: { id }
		})
	}
	
	getSingerDetail()
	getSingerDesc()
	genFans()
	getSingHotSongs()
	getAlbum()
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