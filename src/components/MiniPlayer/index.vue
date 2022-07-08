<template>
	<div>
		<div class="mini_player" @click.prevent="tapMiniPlayer">
			<!-- 歌曲图片 -->
			<div class="m_cover">
				<div class="m_cover_bg flex_box_center_column">
					<img class="m_cover_img" :src="coverImg" alt="">
				</div>
			</div>
			<!-- 歌曲名字 -->
			<div class="m_center">
				<div class="m_info">
					<div class="m_name">{{ currentSong.name }}</div>
					<div class="m_singer">- {{ singerName }}</div>
				</div>
				<div class="current_text" v-if="currentText">
					<van-notice-bar :scrollable="currentText.length>20" :text="currentText" />
				</div>
			</div>
			<!-- 操作按钮 -->
			<div class="m_play_menu">
				<div class="m_menu_icon m_menu_play flex_box_center_column" v-if="!playing" @click.stop="handlePlay">
					<i class="iconfont icon-bofang"></i>
				</div>
				<div class="m_menu_icon m_menu_stop flex_box_center_column" v-else @click.stop="handlePause">
					<i class="iconfont icon-zanting"></i>
				</div>
				<div class="m_menu_icon m_menu_list flex_box_center_column" @click.stop="tapPlayList">
					<i class="iconfont icon-24gf-playlistMusic2"></i>
				</div>
			</div>
		</div>
		<PlayListPopup v-model:showPopup="showList" />
	</div>
</template>
<script lang="ts" setup>
	import { storeToRefs } from 'pinia'
	import { usePlayerStore } from '@/store'
	import { ref } from 'vue'
	import PlayListPopup from '@/components/PlayList/listPopup.vue'
	const playerStore = usePlayerStore()
	const showList = ref<boolean>(false)
	function tapPlayList(): void {
		showList.value = true
	}
	
	function tapMiniPlayer() {
		playerStore.setPlayerVisible(true)
	}
	const { currentSong, singerName, coverImg, playing, currentText } = storeToRefs(playerStore)
	
	function handlePlay() {
		console.log('播放')
		playerStore.setPlaying(true)
	}
	function handlePause() {
		console.log('暂停')
		playerStore.setPlaying(false)
	}
</script>

<style scoped lang="less">
	.mini_player{
		display: flex;
		padding: 5px 20px;
		background: var(--my-back-color-white);
		.m_cover_bg{
			height: 80px;
			width: 80px;
			background-image: url('../../assets/images/public/heijiao.png');
			background-size: 100% 100%;
			background-position: 0 0;
			background-repeat: no-repeat;
			margin-right: 30px;
			.m_cover_img{
				height: 60px;
				width: 60px;
				border-radius: 50%;
			}
		}
		.m_center{
			flex: 1;
			overflow: hidden;
			.current_text{
				width: 100%;
				color: var(--my-text-color-black);
				:deep(.van-notice-bar){
					background-color: var(--my-back-color-white);
					padding-left: 0;
					height: 30px;
					line-height: 30px;
					font-size: 24px;
					color: var(--my-text-color-black);
				}
			}
		}
		.m_info{
			display: flex;
			align-items: center;
			width: 100%;
			overflow: hidden;
			.m_name{
				color: var(--my-text-color-black);
				font-size: 28px;
				font-weight: bold;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.m_singer{
				font-size: 24px;
				color: #999;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.m_play_menu{
			display: flex;
			align-items: center;
			.iconfont{
				font-size: 40px;
				color: var(--my-text-color-black);
			}
			.m_menu_icon{
				margin-left: 20px;
			}
		}
	}
</style>