<template>
	<div class="bigPlayer" :class="{ activePlayer: showBigPlayer }">
		<div class="main_content">
			<div class="top-info">
				<div class="left">
					<van-icon name="arrow-down" @click="hidePlayer" />
				</div>
				<div class="center">
					<div class="song_name">{{ currentSong.name ? currentSong.name: '歌曲名字' }}</div>
					<div class="singer_name">{{ singerName }}</div>
				</div>
				<div class="right">
					<van-icon name="share" />
				</div>
			</div>
			<div class="center_music">
				<!-- 歌曲图片 -->
				<div class="disc" v-show="!showLyric" @click="showLyric = true">
					<div class="m-song-turn">
						<div class="m-song-rollwrap">
							<div class="m-song-img">
								<img class="u-img" src="../../assets/images/player/disc_default.png" alt="">
							</div>
						</div>
					</div>
				</div>
				<!-- 歌词 -->
				<div class="lyric" v-show="showLyric" @click="showLyric = false">
					<Scroll :probeType="3" ref="srcoll">
						<div class="lyric_div">
							<div v-for="i in 100" :key="i" class="lyrclines" :class="[ `lyrcline${ i }`, activeIndex == i ? 'lyrclactive': '' ]">{{ i }}</div>
						</div>
					</Scroll>	
				</div>
			</div>
			<div class="menu_wrapper">
				<div class="action_menu">
					<div class="action_menu_item">
						<i class="iconfont icon-xihuan1"></i>
					</div>
					<div class="action_menu_item">
						<i class="iconfont icon-xiazai"></i>
					</div>
					<div class="action_menu_item">
						<i class="iconfont icon-yichang"></i>
					</div>
					<div class="action_menu_item">
						<i class="iconfont icon-31xiaoxi"></i>
					</div>
					<div class="action_menu_item">
						<i class="iconfont icon-Androidgengduo"></i>
					</div>
				</div>
				<div class="process">
					<div class="left_time">00:00</div>
					<div class="center_process">
						<van-slider v-model="percent" @change="onChange" />
					</div>
					<div class="right_time">08:00</div>
				</div>
				<div class="play_menu">
					<div class="play_menu_item">
						<i class="iconfont icon-huaban"></i>
					</div>
					<div class="play_menu_item">
						<i class="iconfont icon-shangyishou"></i>
					</div>
					<div class="play_menu_item center_icon">
						<i class="iconfont icon-zanting"></i>
					</div>
					<div class="play_menu_item">
						<i class="iconfont icon-xiayishou"></i>
					</div>
					<div class="play_menu_item">
						<i class="iconfont icon-24gf-playlistMusic2"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="player_bg"></div>
		<div class="player_mask"></div>
		<audio :src="currentSong.url" autoplay ref="audio"></audio>
	</div>
</template>

<script setup lang="ts">
	import { ref, Component, watch, nextTick } from 'vue'
	import {
		storeToRefs
	} from 'pinia'
	import {
		usePlayerStore
	} from '@/store'
	import Scroll from '@/components/Scroll'
	const playerStore = usePlayerStore()
	const {
		showBigPlayer, currentSong, singerName
	} = storeToRefs(playerStore)
	const srcoll = ref<Component>()
	const showLyric = ref<boolean>(false)
	// 播放器对象
	const audio = ref<HTMLAudioElement>()
	function hidePlayer(): void {
		playerStore.setPlayerVisible(false)
	}
	// 当前第几行歌词
	const activeIndex = ref<number>(0)
	// 播放进度
	const percent = ref<number>(15)
	setInterval(() => {
		if (activeIndex.value < 50) {
			activeIndex.value++ 
		}
		
		if (activeIndex.value > 5) {
			srcoll.value && srcoll.value.scrollToElemet(document.getElementsByClassName(`lyrcline${ activeIndex.value  - 5 }`)[0], 1000)
		}
	}, 1000)
	
	watch(showBigPlayer, () => {
		nextTick(() => {
			srcoll.value && srcoll.value.refresh()
		})
	})
	
	watch(showLyric, ()=> {
		nextTick(() => {
			srcoll.value && srcoll.value.refresh()
		})
	})
	
	function onChange(val) {
		console.log(val)
	}
	
</script>

<style scoped lang="less">
	.bigPlayer {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 100vh;
		left: 0;
		background-color: #fff;
		z-index: 100;
		overflow: hidden;
		transition: all 0.5s ease-in-out;
		padding: 20px;
		box-sizing: border-box;

		.player_bg {
			background-size: cover;
			background-position: 50%;
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 3;
			opacity: 0.6;
			transform: translateZ(0);
			filter: blur(65px);
			display: block;
			overflow: hidden;
			background-image: url(../../assets/images/public/heijiao.png);
		}

		.player_mask {
			background-color: rgba(0, 0, 0, 0.9);
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
		}

		.main_content {
			position: absolute;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
			z-index: 4;
			padding: 20px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.top-info {
				display: flex;
				justify-content: space-between;
				flex-shrink: 0;

				.left {
					font-size: 36px;
					color: var(--my-text-color-white);
				}

				.center {
					flex: 1;
					text-align: center;

					.song_name {
						font-size: 30px;
						color: var(--my-text-color-white);
					}

					.singer_name {
						font-size: 28px;
						color: var(--my-text-color-white);
					}
				}

				.right {
					font-size: 36px;
					color: var(--my-text-color-white);
				}
			}

			.center_music {
				flex: 1;
				padding-top: 150px;
				overflow: hidden;
				.disc {
					width: 500px;
					height: 500px;
					margin: 0 auto;
					position: relative;

					&::after {
						content: '';
						display: block;
						width: 160px;
						height: 260px;
						top: -120px;
						left: 250px;
						background-image: url(../../assets/images/player/needle-ab.png);
						background-size: contain;
						position: absolute;
						z-index: 3;
					}

					.m-song-turn {
						width: 100%;
						height: 100%;

						&::after {
							content: "";
							position: absolute;
							left: 0;
							right: 0;
							top: 0;
							bottom: 0;
							z-index: 2;
							background: url(../../assets/images/player/disc.png) no-repeat;
							background-size: contain;
						}

						.m-song-rollwrap {
							position: absolute;
							width: 310px;
							height: 310px;
							left: 50%;
							top: 50%;
							z-index: 1;
							margin: -155px 0 0 -155px;

							.m-song-img {
								width: 100%;
								height: 100%;
								border-radius: 50%;
								overflow: hidden;
								background: url(../../assets/images/player/disc_default.png) no-repeat;
								background-size: cover;

								.u-img {
									width: 100%;
									vertical-align: middle;
								}
							}
						}
					}
				}
				.lyric{
					height: 100%;
					overflow: hidden;
					.lyric_div{
						text-align: center;
						font-size: 30px;
						color: var(--my-lyric-color);
						box-sizing: border-box;
						padding: 0 40px;
						.lyrclines{
							font-size: 36px;
							line-height: 50px;
							transition: all 0.4s ease; 
						}
						.lyrclactive{
							color: #fff;
							font-size: 40px;
						}
					}
				}
			}

			.menu_wrapper {
				flex-shrink: 0;
				.action_menu{
					display: flex;
					justify-content: space-between;
					padding: 30px 40px;
					.iconfont{
						font-size: 46px;
						color: var(--my-icon-color);
					}
				}
				.process{
					color: var(--my-icon-color);
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20px;
					font-size: 28px;
					.left_time{
						flex-shrink: 0;
					}
					/deep/ .center_process{
						flex: 1;
						padding: 0 20px;
						.van-slider{
							background: #747474;
						}
						.van-slider__bar{
							background: #949494;
						}
						.van-slider__button{
							width: 24px;
							height: 24px;
							border-radius: 50%;
						}
					}
					.right_time{
						flex-shrink: 0;
					}
				}
				.play_menu{
					padding: 15px 40px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.iconfont{
						color: var(--my-icon-color);
						font-size: 50px;
					}
					.center_icon{
						.iconfont{
							font-size: 100px;
						}
					}
				}
			}
		}
	}

	.activePlayer {
		top: 0;
	}
</style>
