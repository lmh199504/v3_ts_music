<template>
	<div class="home">
		<van-sticky>
			<div class="nav">
				<div class="flex_box_center_column" @click="openMenu">
					<i class="iconfont icon-caidan"></i>
				</div>
				<div class="search_wrapper">
					<div class="flex_box_center_column">
						<i class="iconfont icon-sousuo"></i>
					</div>
					<div class="search_text flex_box_center_column">古风</div>
				</div>
				<div class="flex_box_center_column">
					<i class="iconfont icon-yuyin"></i>
				</div>
			</div>
		</van-sticky>
		<div class="main_content">
			<Swiper />
			<Menu />
			<div class="line"></div>
			<RecommendSongList />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import $bus from '@/utils/eventBus'
	import Swiper from './components/swiper.vue'
	import Menu from './components/menu'
	import RecommendSongList from './components/recommendSongList'
	function openMenu(): void {
		$bus.emit('opne_menu')
	}
</script>

<style scoped lang="less">
	.home{
		overflow-y: scroll;
		height: 100vh;
		padding-bottom: 200px;
		background: #f5f5f5;
		box-sizing: border-box;
	}
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 20px;
		height: 88px;
		background: #e8e8e8;

		.search_wrapper {
			height: 60px;
			background: #fff;
			flex: 1;
			margin: 0 40px;
			display: flex;
			border-radius: 30px;
			display: flex;
			justify-content: center;

			.icon-sousuo {
				padding-top: 4px;
			}

			.search_text {
				margin-left: 10px;
				font-size: 24px;
			}
		}
	}
	.main_content{
		padding: 0 20px 20px 20px;
		.line{
			background: #f5f6f8;
			height: 2px;
		}
	}
	.iconfont {
		font-size: 30px;
	}

	.icon-yuyin,
	.icon-caidan {
		font-size: 40px;
		color: #2e2e2e;
		font-weight: 600;
	}
	
</style>
