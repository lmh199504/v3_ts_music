<template>
	<MiniPlayOut>
		<div class="daysRecommend">
			<van-nav-bar title="每日推荐" left-arrow fixed placeholder @click-left="onClickLeft" right-text="历史日推"
				@click-right="onClickRight"></van-nav-bar>
			<div class="scroll">
				<ScrollBanner ref="scroll">
					<template #btn>
						<div class="btn_wrapper">
							<van-button round color="rgba(0,0,0,0.5)" @click="playAll">
								<i class="iconfont icon-bofang"></i>
								播放全部
							</van-button>
						</div>
					</template>	
					<div class="list">
						<SongItem v-for="item in list" :key="item.id" :song-data="item" />
					</div>
				</ScrollBanner>
			</div>
		</div>
	</MiniPlayOut>
</template>

<script lang="ts" setup>
	import { onClickLeft } from '@/utils/back' 
	import type { SongData } from '@/types/store/player'
	import {
		ref, toRaw, nextTick
	} from 'vue'
	import {
		reqDaysRecommend
	} from '@/api/home'
	import {
		useRouter
	} from 'vue-router'
	import SongItem from '@/components/songItem/index.vue'
	import ScrollBanner from '@/components/Scroll/scrollBanner.vue'
	import { Toast } from 'vant'
	import { usePlayerStore } from '@/store'
	const router = useRouter()
	const playerStore = usePlayerStore()
	const scroll = ref<InstanceType<typeof ScrollBanner>>()
	const list = ref<SongData[]>([])
	const loading = Toast.loading({
		message: '加载中...',
		duration: 0
	})
	reqDaysRecommend()
		.then(res => {
			list.value = res.data.data.dailySongs
			nextTick(() => {
				scroll.value?.refresh()
			})	
		})
		.finally(() => {
			loading.clear()
		})
	
	function onClickRight(): void {
		router.push({
			path: '/daysRecommendHistory'
		})
	}
	function playAll() :void {
		playerStore.resetList(toRaw(list.value))
	}
</script>

<style scoped lang="less">
	.daysRecommend {
		height: 100%;
		.list {
			padding: 30px;
			background-color: var(--my-back-color-white);
		}
		.scroll{
			height: 100%;
		}
		.btn_wrapper{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.iconfont{
				font-size: 30px;
			}
			:deep(.van-button){
				border: 1px solid #fff;
			}
		}
	}
</style>
