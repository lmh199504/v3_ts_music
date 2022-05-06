<template>
	<div>
		<div class="mini_player">
			<!-- 歌曲图片 -->
			<div class="m_cover">
				<div class="m_cover_bg flex_box_center_column">
					<img class="m_cover_img" src="https://y.gtimg.cn/music/photo_new/T002R90x90M000001RbJHh2dr7nu_1.jpg?max_age=2592000" alt="">
				</div>
			</div>
			<!-- 歌曲名字 -->
			<div class="m_info">
				<div class="m_name">清明雨上</div>
				<div class="m_singer">- 许嵩</div>
			</div>
			<!-- 操作按钮 -->
			<div class="m_play_menu">
				<div class="m_menu_icon m_menu_play flex_box_center_column">
					<i class="iconfont icon-bofang"></i>
				</div>
				<div class="m_menu_icon m_menu_stop flex_box_center_column">
					<i class="iconfont icon-zanting"></i>
				</div>
				<div class="m_menu_icon m_menu_list flex_box_center_column" @click="tapPlayList">
					<i class="iconfont icon-24gf-playlistMusic2"></i>
				</div>
			</div>
		</div>
		<PlayListPopup v-model:showPopup="showList" />
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import PlayListPopup from '@/components/PlayList/listPopup'
	const showList = ref<boolean>(false)
	function tapPlayList(): void {
		showList.value = true
	}
</script>

<style scoped lang="less">
	.mini_player{
		display: flex;
		padding: 5px 20px;
		background: #fff;
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
		.m_info{
			display: flex;
			align-items: center;
			flex: 1;
			.m_name{
				color: #000;
				font-size: 28px;
				font-weight: bold;
			}
			.m_singer{
				font-size: 24px;
				color: #999;
			}
		}
		.m_play_menu{
			display: flex;
			align-items: center;
			.iconfont{
				font-size: 40px;
			}
			.m_menu_icon{
				margin-left: 20px;
			}
		}
	}
</style>