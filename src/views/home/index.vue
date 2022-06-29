<template>
	<div class="home">
		<van-pull-refresh v-model="loading" @refresh="onRefresh">
			<van-sticky>
				<div class="nav">
					<div class="flex_box_center_column" @click="openMenu">
						<i class="iconfont icon-caidan"></i>
					</div>
					<div class="search_wrapper" @click.stop="goSearch">
						<div class="flex_box_center_column">
							<i class="iconfont icon-sousuo"></i>
						</div>
						<div class="search_text flex_box_center_column">{{ showKeyword }}</div>
					</div>
					<div class="flex_box_center_column">
						<i class="iconfont icon-yuyin"></i>
					</div>
				</div>
			</van-sticky>
			<div class="main_content">
				<Swiper ref="swiper" />
				<Menu />
				<div class="line"></div>
				<RecommendSongList ref="recommendSongList" />
				<NewSong ref="newSong" />
				<NewMvVue />
			</div>
		</van-pull-refresh>	
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import $bus from '@/utils/eventBus'
	import Swiper from './components/swiper.vue'
	import Menu from './components/menu.vue'
	import RecommendSongList from './components/recommendSongList.vue'
	import NewSong from './components/newSong.vue'
	import NewMvVue from './components/newMv.vue'
	import { reqSearchDefault } from '@/api/search'
	import { useRouter } from 'vue-router'
	
	const router = useRouter()
	const loading = ref<boolean>(false)
	const swiper = ref<InstanceType<typeof Swiper>>()
	const recommendSongList = ref<InstanceType<typeof RecommendSongList>>()
	const newSong = ref<InstanceType<typeof NewSong>>()
	const showKeyword = ref<string>('')
	
	function onRefresh() {
		swiper.value && swiper.value.getBanner()
		recommendSongList.value && recommendSongList.value.getList()
		newSong.value && newSong.value.getList()
		setTimeout(() => {
			loading.value = false
		}, 2000)
	}
	
	function getDefaultWord(): void {
		reqSearchDefault()
		.then(res => {
			showKeyword.value = res.data.data.showKeyword
		})
	}
	function goSearch(): void {
		router.push({
			path: '/search'
		})
	}
	// 侧边菜单
	function openMenu(): void {
		$bus.emit('opne_menu')
	}
	
	getDefaultWord()
	
</script>

<style scoped lang="less">
	.home{
		overflow-y: scroll;
		height: 100vh;
		padding-bottom: 200px;
		background: var(--my-back-color-gray);
		box-sizing: border-box;
	}
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 20px;
		height: 88px;
		background: var(--my-gray-1);
		.iconfont{
			color: var(--my-text-color-black);
		}
		.search_wrapper {
			height: 60px;
			background: var(--my-search-back);
			flex: 1;
			margin: 0 40px;
			display: flex;
			border-radius: 30px;
			display: flex;
			justify-content: center;
			color: var(--my-text-color-black);
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
			background: var(--van-gray-3);
			height: 2px;
		}
	}
	.iconfont {
		font-size: 30px;
	}

	.icon-yuyin,
	.icon-caidan {
		font-size: 40px;
		font-weight: 600;
	}
	
</style>
