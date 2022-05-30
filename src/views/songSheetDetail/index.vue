<template>
	<div class="songSheetDetail">
		<MiniPlayOut>
			<van-nav-bar left-arrow @click-left="onClickLeft">
				<template #title>
					<van-notice-bar scrollable :text="details.name" />
				</template>
			</van-nav-bar>
			<Scroll :probeType="3" ref="scrollRef" :imgUrl="details.coverImgUrl">
				<template #btn>
					<div class="top_content">
						<div class="bg">
							<img :src="details.coverImgUrl" alt="">
						</div>
						<div class="mask"></div>
						<div class="main">
							<div class="data">
								<div class="left">
									<div class="play_count">
										<i class="iconfont icon-bofang"></i>
										<div>{{ formatCountNumber(details.playCount) }}</div>
									</div>
									<img :src="details.coverImgUrl" alt="" v-if="details.coverImgUrl">
								</div>
								<div class="right">
									<div class="sheetName text_over_two_lines">{{ details.name }}</div>
									<!-- 作者 -->
									<div class="creator" v-if="details.creator">
										<img class="avatarUrl" :src="details.creator.avatarUrl" alt="" >
										<div class="nickname">{{ details.creator.nickname }}</div>
									</div>
									<div class="description" @click="show = true">
										<div class="text">{{ details.description }}</div>
										<van-icon name="arrow" />
									</div>
								</div>
							</div>
							<div class="btn_wrapper">
								<div class="btn_item">
									<div class="flex_box_center_column"><i class="iconfont icon-shoucangjia"></i></div>
									<div class="text">{{ details.subscribedCount }}</div>
								</div>
								<div class="btn_item">
									<div class="flex_box_center_column"><i class="iconfont icon-pinglun"></i></div>
									<div class="text">{{ details.commentCount }}</div>
								</div>
								<div class="btn_item">
									<div class="flex_box_center_column"><i class="iconfont icon-fenxiang"></i></div>
									<div class="text">{{ details.shareCount }}</div>
								</div>
								<div class="btn_item" @click="PlayAll">
									<div class="flex_box_center_column"><i class="iconfont icon-bofang"></i></div>
								</div>
							</div>
						</div>
					</div>
				</template>
				<div class="list">
					<SongItem v-for="item in list" :key="item.id" :song-data="item" />
				</div>
			</Scroll>
		</MiniPlayOut>
		
		<SheetInfo v-model:showPopup="show" :info="details" />
	</div>
</template>

<script setup lang="ts">
	import SongItem from '@/components/songItem'
	import MiniPlayOut from '@/layout/miniplayout'
	import Scroll from '@/components/Scroll/scrollBanner'
	import { usePlayerStore } from '@/store'
	import SheetInfo from './components/sheetInfo.vue'
	import { Toast } from 'vant'
	import {
		reqSheetDetail, reqSheetSongs
	} from '@/api/song'
	import {
		useRoute,
		useRouter
	} from 'vue-router'
	import {
		ref,
		reactive,
		Component,
		nextTick,
		toRaw
	} from 'vue'
	import { formatCountNumber } from '@/utils'
	const route = useRoute()
	const router = useRouter()
	const details = reactive({})
	const list = ref([])
	const scrollRef = ref < Component > ()
	const playerStore = usePlayerStore()
	const show = ref<boolean>(false)
	function getDetail() {
		Toast.loading({
			duration: 0,
			message: '加载中...',
			overlay: true
		})
		reqSheetDetail({
				id: route.query.id
			})
			.then(res => {
				for (const key in res.data.playlist) {
					details[key] = res.data.playlist[key]
				}
				Toast.clear()
			})
			.catch(() => {
				Toast.clear()
			})
	}
	
	function getSheetSongs() {
		reqSheetSongs({ id: route.query.id })
		.then(res => {
			list.value = res.data.songs
			nextTick(() => {
				scrollRef.value.refresh()
			})
		})
	}

	function onClickLeft() {
		router.back()
	}
	
	function PlayAll() {
		playerStore.resetList(toRaw(list.value))
	}
	
	
	getDetail()
	getSheetSongs()
	
</script>

<style scoped lang="less">
	.songSheetDetail {
		:deep(.van-notice-bar) {
			background: transparent;
			width: 60vw;
			color: var(--my-text-color-black);
		}

		.list {
			padding: 30px;
		}
		.top_content{
			position: relative;
			width: 100%;
			height: 100%;
			.bg{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				filter: blur(40px);
				z-index: 1;
			}
			.mask{
				position: absolute;
				z-index: 2;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: var(--my-mask-color);
			}
			.main{
				position: absolute;
				z-index: 3;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				padding: 30px;
				box-sizing: border-box;
				.data{
					display: flex;
					.left{
						width: 200px;
						height: 200px;
						flex-shrink: 0;
						background-color: var(--my-back-color-gray);
						border-radius: 10px;
						margin-right: 40px;
						position: relative;
						.play_count{
							position: absolute;
							top: 15px;
							right: 15px;
							color: var(--my-text-color-white);
							font-size: 28px;
							background: rgba(0, 0, 0, 0.2);
							padding: 2px 5px;
							border-radius: 8px;
							display: flex;
							align-items: center;
							.iconfont{
								margin-right: 5px;
							}
						}
						img{
							width: 100%;
							height: 100%;
							border-radius: 10px;
						}
					}
					.right{
						.sheetName{
							color: var(--my-text-color-white);
							font-size: 30px;
						}
						.creator{
							display: flex;
							margin-top: 20px;
							align-items: center;
							.avatarUrl{
								width: 50px;
								height: 50px;
								border-radius: 50%;
								overflow: hidden;
								object-fit: cover;
								margin-right: 15px;
							}
							.nickname{
								color: var(--my-text-color-gray);
								font-size: 24px;
							}
						}
						.description{
							display: flex;
							align-items: center;
							color: var(--my-text-color-gray);
							margin-top: 30px;
							.text{
								max-width: 250px;
								overflow: hidden;
								font-size: 24px;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
							:deep(.van-icon) {
								font-size: 24px;
								vertical-align: middle;
								margin-top: 5px;
							}
						}
					}
				}
				.btn_wrapper{
					display: flex;
					justify-content: space-evenly;
					width: fit-content;
					margin: auto;
					height: 80px;
					border-radius: 40px;
					min-width: 600px;
					background-color: var(--my-back-color-white);
					box-shadow: 0 0 20px 0 rgba(136,137,140,.33);
					margin-top: 60px;
					.btn_item{
						color: var(--my-text-color-black);
						display: flex;
						align-items: center;
						.iconfont{
							color: var(--my-text-color-black);
							font-size: 28px;
							
						}
						.text{
							font-size: 24px;
							color: var(--my-text-color-black);
							margin-left: 15px;
						}
					}
				}
			}
		}
	}
</style>