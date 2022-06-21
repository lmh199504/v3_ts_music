<template>
	<MiniPlayOut>
		<div class="history">
			<van-nav-bar left-arrow fixed placeholder title="历史推荐" @click-left="onClickLeft"></van-nav-bar>
			<ScrollBanner ref="scroll">
				<template #btn>
					<div class="btn_wrapper">
						<van-button round color="rgba(0,0,0,0.5)">
							<i class="iconfont icon-bofang"></i>
							播放全部
						</van-button>
					</div>
				</template>	
				<van-tabs v-model:active="active">
					<van-tab :title="item" v-for="item in dataList" :key="item">
						<DateList :date="item" @refresh="refresh" />
					</van-tab>
				</van-tabs>
			</ScrollBanner>	
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import ScrollBanner from '@/components/Scroll/scrollBanner.vue'
	import { ref, nextTick, Ref } from 'vue'
	import {
		reqGetRecommendDate
	} from '@/api/home'
	import DateList from './components/dateList.vue'
	import { onClickLeft } from '@/utils/back' 
	const scroll = ref<InstanceType<typeof ScrollBanner>>()
	const active: Ref<number> = ref(0)
	const dataList = ref<Array<string>>([])
	
	async function initData() {
		const resDate = await reqGetRecommendDate()
		dataList.value = resDate.data.data.dates
	}

	function refresh() {
		nextTick(() => {
			scroll.value?.refresh()
		})	
	}
	initData()
	
</script>

<style scoped lang="less">
	.history{
		height: 100%;
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
