<template>
	<div class="daysRecommend">
		<van-nav-bar title="每日推荐" left-arrow fixed placeholder @click-left="onClickLeft" right-text="历史日推"
			@click-right="onClickRight"></van-nav-bar>

		<van-sticky offset-top="1.22667rem">
			<div class="playAll">
				<i class="iconfont icon-bofang1"></i>
				<div>播放全部</div>
			</div>
		</van-sticky>
		<div class="list">
			<SongItem v-for="item in list" :key="item.id" :song-data="item" />
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
	}
</style>
