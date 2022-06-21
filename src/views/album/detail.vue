<template>
	<div class="songSheetDetail">
		<MiniPlayOut>
			<van-nav-bar fixed placeholder left-arrow @click-left="onClickLeft">
				<template #title>
					<van-notice-bar scrollable :text="details.name" />
				</template>
			</van-nav-bar>
			<Scroll :probeType="3" ref="scrollRef" :stopPropagation="true" :imgUrl="details.picUrl">
				<template #btn>
					<div class="top_content">
						<div class="bg">
							<img :src="details.picUrl" alt="">
						</div>
						<div class="mask"></div>
						<div class="main">
							<div class="data">
								<div class="left">
									<div class="play_count">
										<i class="iconfont icon-bofang"></i>
										<div>{{ formatCountNumber(info.shareCount) }}</div>
									</div>
									<img :src="details.picUrl" alt="" v-if="details.picUrl">
								</div>
								<div class="right">
									<div class="sheetName text_over_two_lines">{{ details.name }}</div>
									<!-- 作者 -->
									<div class="creator" v-if="details.artist">
										<img class="avatarUrl" :src="details.artist.img1v1Url" alt="" >
										<div class="nickname">{{ details.artist.name }}</div>
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
									<div class="text">{{ info.likedCount }}</div>
								</div>
								<div class="btn_item">
									<div class="flex_box_center_column"><i class="iconfont icon-pinglun"></i></div>
									<div class="text">{{ info.commentCount }}</div>
								</div>
								<div class="btn_item">
									<div class="flex_box_center_column"><i class="iconfont icon-fenxiang"></i></div>
									<div class="text">{{ info.shareCount }}</div>
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
	import { onClickLeft } from '@/utils/back' 
	import SongItem from '@/components/songItem/index.vue'
	import Scroll from '@/components/Scroll/scrollBanner.vue'
	import { usePlayerStore } from '@/store'
	import SheetInfo from './components/sheetInfo.vue'
	import { SongData } from '@/types/store/player'
	import {
		useRoute
	} from 'vue-router'
	import {
		ref,
		reactive,
		nextTick,
		toRaw
	} from 'vue'
	import { formatCountNumber } from '@/utils'
	import { reqAlbum } from '@/api/album'
	const route = useRoute()
	const details = reactive({
		id: 0,
		shareCount: 0,
		commentCount: 0,
		tags: [],
		picUrl: '',
		name: '',
		artist: {
			img1v1Url: '',
			name: ''
		},
		description: ''
	})
	const list = ref<SongData[]>([])
	const scrollRef = ref < InstanceType<typeof Scroll> > ()
	const playerStore = usePlayerStore()
	const show = ref<boolean>(false)
	const info = reactive({
		tags: [],
		shareCount: 0,
		likedCount: 0,
		commentCount: 0
	})

	function PlayAll() {
		playerStore.resetList(toRaw(list.value))
	}

	function getAlbum() {
		reqAlbum({ id: Number(route.query.id) })
		.then(res => {
			// console.log(res)
			list.value = res.data.songs
			
			// for (const key in res.data.album.info) {
			// 	info[key] = res.data.album.info[key]
			// }
			const infoData = res.data.album.info
			info.commentCount = infoData.commentCount
			info.likedCount = infoData.likedCount
			info.shareCount = infoData.shareCount
			info.tags = infoData.tags

			// for(const key in res.data.album) {
			// 	details[key] = res.data.album[key]
			// }
			const detailsData = res.data.album
			details.artist = detailsData.artist
			details.commentCount = detailsData.commentCount
			details.description = detailsData.description
			details.id = detailsData.id
			details.name = detailsData.name
			details.picUrl = detailsData.picUrl
			details.shareCount = detailsData.shareCount
			details.tags = detailsData.tags

			nextTick(() => {
				scrollRef.value && scrollRef.value.refresh()
			})
		})
	}
	getAlbum()
	
</script>

<style scoped lang="less">
	.songSheetDetail {
		overflow: hidden;
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
				left: 50%;
				top: 50%;
				width: 100%;
				height: fit-content;
				padding: 30px;
				box-sizing: border-box;
				transform: translate(-50%, -50%);
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
