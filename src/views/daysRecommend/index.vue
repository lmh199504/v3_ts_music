<template>
	<div class="daysRecommend">
		<van-nav-bar title="每日推荐" left-arrow fixed placeholder @click-left="onClickLeft" right-text="历史日推"
			@click-right="onClickRight"></van-nav-bar>
		<div class="scroll">
			<ScrollBanner>
				<template #btn>
					<div class="btn_wrapper">
						<van-button round color="rgba(0,0,0,0.5)">
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
</template>

<script lang="ts" setup>
	import {
		ref
	} from 'vue'
	import {
		reqDaysRecommend
	} from '@/api/home'
	import {
		useRouter
	} from 'vue-router'
	import SongItem from '@/components/songItem'
	import ScrollBanner from '@/components/Scroll/scrollBanner'
	import { Toast } from 'vant'
	const router = useRouter()
	const list = ref([])
	const loading = Toast.loading({
		message: '加载中...',
		duration: 0
	})
	reqDaysRecommend()
		.then(res => {
			list.value = res.data.data.dailySongs
		})
		.finally(() => {
			loading.clear()
		})

	function onClickLeft(): void {
		router.back()
	}

	function onClickRight(): void {
		router.push({
			path: '/daysRecommendHistory'
		})
	}
</script>

<style scoped lang="less">
	.daysRecommend {
		.list {
			padding: 30px;
		}
		.scroll{
			height: 100vh;
		}
		.playAll{
			background: #fff;
			padding: 15px 30px;
			font-size: 28px;
			display: flex;
			align-items: center;
			.iconfont{
				color: #fd352c;
				font-size: 40px;
				margin-right: 20px;
			}
		}
		.btn_wrapper{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.iconfont{
				font-size: 30px;
			}
			/deep/ .van-button{
				border: 1px solid #fff;
			}
		}
	}
</style>
