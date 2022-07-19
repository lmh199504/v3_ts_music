<template>
	<div class="bigPlayer" :class="{ activePlayer: showBigPlayer }">
		<div class="main_content">
			<div class="top-info">
				<div class="left">
					<van-icon name="arrow-down" @click="hidePlayer" />
				</div>
				<div class="center">
					<div class="song_name">{{ currentSong.name ? currentSong.name : '歌曲名字' }}</div>
					<div class="singer_name">{{ singerName }}</div>
				</div>
				<div class="right">
					<van-icon name="share" @click="showShare = true"/>
				</div>
			</div>
			<div class="center_music" @click="showLyric = !showLyric">
				<!-- 歌曲图片 -->
				<div class="disc" :class="{ 'disc_pause': !playing }" v-show="!showLyric">
					<div class="m-song-turn animate__rotate" :class="{ 'rotate_pause': !playing }">
						<div class="m-song-rollwrap">
							<div class="m-song-img">
								<img class="u-img" :src="coverImg" alt="">
							</div>
						</div>
					</div>
				</div>
				<!-- 歌词 -->
				<div class="lyric" v-show="showLyric">
					<Scroll :probeType="3" ref="srcoll" :stopPropagation="true">
						<div class="lyric_div" v-if="lyricLines.length">
							<div v-for="(item, index) in lyricLines" :key="index" class="lyrclines"
								:class="[`lyrcline${index}`, activeIndex == index ? 'lyrclactive' : '']">{{ item.txt
								}}</div>
						</div>
						<div v-else class="lyric_div">
							歌词跑丢了~
						</div>
					</Scroll>
					<div class="mask_lyric"></div>
				</div>
			</div>
			<div class="menu_wrapper">
				<!-- 操作按钮 -->
				<div class="action_menu">
					<div v-if="currentSong.type !== MusicType.dj" class="action_menu_item" @click="likeSong">
						<i v-if="!isLike" class="iconfont icon-xihuan1"></i>
						<i v-else class="iconfont icon-xihuan redcolor"></i>
					</div>
					<div class="action_menu_item">
						<i class="iconfont icon-xiazai"></i>
					</div>
					<div class="action_menu_item">
						<i class="iconfont icon-yichang"></i>
					</div>
					<div class="action_menu_item" @click="showComment = true">
						<div class="commentNum">{{ commentNum }}</div>
						<i class="iconfont icon-31xiaoxi"></i>
					</div>
					<div class="action_menu_item">
						<i class="iconfont icon-Androidgengduo"></i>
					</div>
				</div>
				<!-- 进度条 -->
				<div class="process">
					<div class="left_time">{{ formatMusicTime(currentTime) }}</div>
					<div class="center_process">
						<van-slider v-model="processNum" @change="onChange" @drag-start="dragStart"
							@drag-end="dragEnd" />
					</div>
					<div class="right_time">{{ formatMusicTime(currentSong.dt) }}</div>
				</div>
				<!-- 播放菜单 -->
				<div class="play_menu">

					<!-- <div class="play_menu_item" v-if="playMode === PlayModeData.beckoning" @click="switchMode(PlayModeData.beckoning)">
						<i class="iconfont icon-huaban"></i>
					</div> -->
					<div class="play_menu_item" v-if="playMode === PlayModeData.list"
						@click="switchMode(PlayModeData.list)">
						<i class="iconfont icon-shuzishunxu"></i>
					</div>
					<div class="play_menu_item" v-if="playMode === PlayModeData.random"
						@click="switchMode(PlayModeData.random)">
						<i class="iconfont icon-24gl-shuffle"></i>
					</div>
					<div class="play_menu_item" v-if="playMode === PlayModeData.loop"
						@click="switchMode(PlayModeData.loop)">
						<i class="iconfont icon-icon-"></i>
					</div>
					<div class="play_menu_item" v-if="playMode === PlayModeData.single"
						@click="switchMode(PlayModeData.single)">
						<i class="iconfont icon-hanhan-01-01"></i>
					</div>

					<div class="play_menu_item" @click="playPre">
						<i class="iconfont icon-shangyishou"></i>
					</div>
					<div v-if="playing" class="play_menu_item center_icon" @click="setPlaying">
						<i class="iconfont icon-zanting"></i>
					</div>
					<div v-else class="play_menu_item center_icon" @click="setPlaying">
						<i class="iconfont icon-bofang"></i>
					</div>
					<div class="play_menu_item" @click="playNext">
						<i class="iconfont icon-xiayishou"></i>
					</div>
					<div class="play_menu_item" @click="showList = true">
						<i class="iconfont icon-24gf-playlistMusic2"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="player_bg" :style="bgStyle"></div>
		<div class="player_mask"></div>
		<audio :src="songUrl" autoplay ref="audio" @ended="onPlayEnd" @timeupdate="onTimeupdate"
			@error="onPlayError"></audio>
		<PlayListPopup v-model:showPopup="showList" />
		<CommentPopup v-model:visible="showComment" :source-id="currentSong.id"
			:comment-type="currentSong.type == MusicType.dj ? CommentType.dj : CommentType.song" />
		<ShareFriend v-if="showShare" :source="MsgType.song" v-model:visible="showShare" :source-id="currentSong.id" />	
	</div>
</template>

<script setup lang="ts">
import { CommentType } from '@/types/public/comment'
import PlayListPopup from '@/components/PlayList/listPopup.vue'
import CommentPopup from '@/components/Comment/commentPopup.vue'
import { PlayModeData, MusicType } from '@/types/store/player'
import { formatMusicTime } from '@/utils'
import Lyric from 'lyric-parser'
import { ref, watch, nextTick, computed, toRaw } from 'vue'
import { reqSongComment } from '@/api/comment'
import {
	storeToRefs
} from 'pinia'
import {
	usePlayerStore,
	useUserStore
} from '@/store'
import Scroll from '@/components/Scroll/index.vue'
import { reqGetLyric, reqLikeSong } from '@/api/song'
import { Toast } from 'vant'
import { MsgType } from '@/types/public/msg'
import ShareFriend from '@/components/ShareFriend/index.vue'

const playerStore = usePlayerStore()
const userStore = useUserStore()
const showList = ref<boolean>(false)
const {
	showBigPlayer, currentSong, singerName,
	coverImg, playing, currentTime, percent, playMode, playIndex, isLast, playList, isFirst
} = storeToRefs(playerStore)
const { likeList } = storeToRefs(userStore)
const srcoll = ref<InstanceType<typeof Scroll>>()
const showLyric = ref<boolean>(false)
const commentNum = ref<number | string>(0) // 评论数量
// 播放器对象
const audio = ref<HTMLAudioElement>()
function hidePlayer(): void {
	playerStore.setPlayerVisible(false)
}
// 分享
const showShare = ref<boolean>(false)
// 是否显示评论
const showComment = ref<boolean>(false)
// 当前第几行歌词
const activeIndex = ref<number>(0)
// 是否拖拽进度条
const isDraging = ref<boolean>(false)
// 进度条
const processNum = ref<number>(0)
// 歌词对象
let lyric: { seek: (arg0: number) => void; togglePlay: () => void; stop: () => void; lines: { time: number; txt: string }[]; play: () => void } | null = null
// 歌词列表
interface LinesData {
	time: number;
	txt: string;
}
// 歌词列表
const lyricLines = ref<Array<LinesData>>([])
// 是否为喜欢的歌曲
const isLike = computed(() => {
	return likeList.value.includes(currentSong.value.id)
})
// 歌曲播放url
const songUrl = ref<string>('')
watch(showBigPlayer, (val) => {
	if (val) {
		showLyric.value = false
	}
	if (val === false) {
		showComment.value = false
	}
	nextTick(() => {
		srcoll.value && srcoll.value.refresh()
	})
})

watch(showLyric, () => {
	nextTick(() => {
		srcoll.value && srcoll.value.refresh()
		if (playing.value && audio.value) {
			lyric && lyric.seek(audio.value.currentTime * 1000)
		}
	})
})

watch(playing, (val) => {
	if (currentSong.value.id) {
		if (val) { // 播放
			audio.value?.play()
		} else {
			audio.value?.pause()
		}
		lyric && lyric.togglePlay()
	}
})

function setPlaying() {
	if (!currentSong.value.id) {
		return
	}
	if (playing.value) {
		playerStore.setPlaying(false)
	} else {
		playerStore.setPlaying(true)
	}
}
watch(currentSong, val => {
	if (val.id) {
		songUrl.value = val.url
		getComment()
		getLyric(val.id)
	}
}, { immediate: true })
// 获取歌词
function getLyric(id: number): void {
	reqGetLyric({ id: id })
		.then(res => {
			if (res.data?.lrc?.lyric) {
				initPlayer(res.data.lrc.lyric)
			} else { // 么有歌词
				lyricLines.value = []
				playerStore.setCurrentText('歌词跑丢了')
			}
		})
}
interface LineLyric {
	lineNum: number
	txt: string
}
function handler(lyric: LineLyric) {
	console.log(lyric)
	const { lineNum, txt } = lyric
	activeIndex.value = lineNum
	if (activeIndex.value > 5) {
		srcoll.value && srcoll.value.scrollToElemet(document.getElementsByClassName(`lyrcline${activeIndex.value - 5}`)[0] as HTMLElement, 1000)
	} else {
		srcoll.value && srcoll.value.scrollToElemet(document.getElementsByClassName(`lyrcline${0}`)[0] as HTMLElement, 1000)
	}
	playerStore.setCurrentText(txt)
}
// 初始化播放器
function initPlayer(lyricText: string): void {
	if (lyric) {
		lyric.stop()
		activeIndex.value = 0
		lyric = null
	}
	lyric = new Lyric(lyricText, handler)
	console.log(lyric)
	lyricLines.value = lyric?.lines || []
	if (audio.value) {
		audio.value.volume = 0.1
	}
	lyric?.play()
	audio.value && lyric?.seek(audio.value.currentTime * 1000)
}
// 获取评论
function getComment() {
	console.log(currentSong.value.id)
	reqSongComment({ id: currentSong.value.id })
		.then(res => {
			commentNum.value = res.data.total > 999 ? '999+' : res.data.total
		})
}
const bgStyle = computed(() => {
	return { 'background-image': `url(${coverImg.value})` }
})

// 不在拖拽时
watch(percent, (val) => {
	if (!isDraging.value) processNum.value = val
})
function dragStart() {
	isDraging.value = true
}
function dragEnd() {
	isDraging.value = false
}
// 进度条改变
function onChange(val: number) {
	const time = (val / 100) * (currentSong.value.dt / 1000)
	if (audio.value) {
		audio.value.currentTime = (val / 100) * (currentSong.value.dt / 1000)
		audio.value.play()
	}
	lyric?.play()
	lyric?.seek(time * 1000)
}
// 播放事件监听
function onPlayEnd() {
	console.log('播放结束')
	if (playMode.value === PlayModeData.list) { // 列表播放
		if (lyric) {
			lyric.stop()
			activeIndex.value = 0
			lyric = null
		}
		if (!isLast.value) {
			if (playList.value.length) {
				playNext()
			}
		}
	} else if (playMode.value === PlayModeData.loop) { // 列表循环
		if (lyric) {
			lyric.stop()
			activeIndex.value = 0
			lyric = null
		}
		if (playList.value.length) {
			playNext()
		}
	} else if (playMode.value === PlayModeData.random) { // 随机播放
		if (lyric) {
			lyric.stop()
			activeIndex.value = 0
			lyric = null
		}
		const randomIndex = Math.ceil(Math.random() * (playList.value.length - 1))
		playerStore.setCurSong(playList.value[randomIndex])
	} else if (playMode.value === PlayModeData.single) { //单曲循环
		audio.value && (audio.value.currentTime = 0)
		if (lyric) {
			lyric?.seek(0)
		}
		audio.value?.play()
	}
}
function onTimeupdate() {
	audio.value && playerStore.setCurrentTime(audio.value?.currentTime * 1000)
}
function onPlayError(e: Event) {
	if (!currentSong.value.url) {
		return
	}
	console.log(e)
	console.log('播放错误')
	// 播放403 错误时 尝试使用id播放
	if (songUrl.value.indexOf(String(currentSong.value.id)) === -1) {
		const url = `https://music.163.com/song/media/outer/url?id=${currentSong.value.id}.mp3`
		songUrl.value = url
	} else {
		if (playList.value.length) {
			console.log('播放下一首')
			playNext()
		}
	}
}
// 下一首
function playNext() {
	if (isLast.value) { // 最后一首
		if (playList.value.length == 1) { // 列表就一首歌
			audio.value && (audio.value.currentTime = 0)
			lyric?.seek(0)
			audio.value?.play()
		} else {
			playerStore.setCurSong(toRaw(playList.value[0]))
		}
	} else {
		let index = playIndex.value + 1
		if (playMode.value === PlayModeData.random) {
			const randomIndex = Math.ceil(Math.random() * (playList.value.length - 1))
			if (randomIndex !== index) {
				index = randomIndex
			}
		}
		playerStore.setCurSong(toRaw(playList.value[index]))
	}
}
// 上一首
function playPre() {
	if (isFirst.value) { // 第一首
		playerStore.setCurSong(toRaw(playList.value[playList.value.length - 1]))
	} else {
		playerStore.setCurSong(toRaw(playList.value[playIndex.value - 1]))
	}
}
// 播放模式
function switchMode(mode: PlayModeData) {
	console.log(mode)
	Toast.clear()
	switch (mode) {
		case PlayModeData.beckoning:
			playerStore.setPlayMode(PlayModeData.list)
			Toast('列表播放')
			break;
		case PlayModeData.list:
			playerStore.setPlayMode(PlayModeData.random)
			Toast('随机播放')
			break;
		case PlayModeData.random:
			playerStore.setPlayMode(PlayModeData.loop)
			Toast('列表循环')
			break;
		case PlayModeData.loop:
			playerStore.setPlayMode(PlayModeData.single)
			Toast('单曲循环')
			break;
		case PlayModeData.single:
			playerStore.setPlayMode(PlayModeData.list)
			Toast('列表播放')
			break;
		default:
			break;
	}
}
// 喜欢歌曲
function likeSong() {
	reqLikeSong({
		id: currentSong.value.id,
		like: !isLike.value
	})
		.then(() => {
			if (isLike.value) {
				Toast.success('取消喜欢')
			} else {
				Toast.success('添加喜欢')
			}
			userStore.getLikeList()
		})
}
</script>

<style scoped lang="less">
.bigPlayer {
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 200vh;
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
		z-index: 2;
		opacity: 0.6;
		transform: translateZ(0);
		filter: blur(65px);
		display: block;
		overflow: hidden;
	}

	.player_mask {
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 3;
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
				color: var(--my-player-text-white);
			}

			.center {
				flex: 1;
				text-align: center;

				.song_name {
					font-size: 30px;
					color: var(--my-player-text-white);
				}

				.singer_name {
					font-size: 28px;
					color: var(--my-player-text-white);
				}
			}

			.right {
				font-size: 36px;
				color: var(--my-player-text-white);
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
					transition: all 0.4s ease;
					transform-origin: 26px 26px;
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

			.disc_pause {
				&::after {
					transform: rotate(-35deg);
					transform-origin: 26px 26px;
				}
			}

			.lyric {
				height: 100%;
				overflow: hidden;
				position: relative;

				.mask_lyric {
					position: absolute;
					z-index: 1;
					bottom: 0;
					height: 60px;
					// background: linear-gradient(rgba(255,255,255, 0.1), rgba(255,255,255, 0));
					// background: linear-gradient(blue, red);
					left: 0;
					width: 100%;
				}

				.lyric_div {
					text-align: center;
					font-size: 30px;
					color: var(--my-lyric-color);
					box-sizing: border-box;
					padding: 0 40px;

					.lyrclines {
						font-size: 30px;
						line-height: 60px;
						transition: all 0.4s ease;
					}

					.lyrclactive {
						color: #fff;
						font-size: 32px;
					}
				}
			}
		}

		.menu_wrapper {
			flex-shrink: 0;

			.action_menu {
				display: flex;
				justify-content: space-between;
				padding: 30px 40px;

				.action_menu_item {
					position: relative;

					.commentNum {
						color: var(--my-icon-color);
						font-size: 24px;
						position: absolute;
						top: 15px;
						z-index: 2;
						right: -20px;
					}
				}

				.iconfont {
					font-size: 46px;
					color: var(--my-icon-color);
				}

				.redcolor {
					color: red;
				}
			}

			.process {
				color: var(--my-icon-color);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20px;
				font-size: 28px;

				.left_time {
					width: 100px;
					overflow: hidden;
					flex-shrink: 0;
				}

				:deep(.center_process) {
					flex: 1;
					padding: 0 20px;

					.van-slider {
						background: #747474;
					}

					.van-slider__bar {
						background: #949494;
					}

					.van-slider__button {
						width: 24px;
						height: 24px;
						border-radius: 50%;
					}
				}

				.right_time {
					width: 100px;
					flex-shrink: 0;
				}
			}

			.play_menu {
				padding: 15px 40px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.iconfont {
					color: var(--my-icon-color);
					font-size: 50px;
				}

				.center_icon {
					.iconfont {
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

@keyframes rotating {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}

.animate__rotate {
	animation: rotating 6s linear infinite;
}

.rotate_pause {
	animation-play-state: paused;
}
</style>
