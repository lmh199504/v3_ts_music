<template>
	<MiniPlayOut>
		<div class="singer">
			<van-nav-bar title="歌手" left-arrow fixed placeholder @click-left="onClickLeft" />
			<van-dropdown-menu>
				<van-dropdown-item v-model="type" :options="singerType" @change="onRefresh" />
				<van-dropdown-item v-model="area" :options="araeList" @change="onRefresh" />
			</van-dropdown-menu>
			<van-pull-refresh v-model="pushLoading" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<SingerItem v-for="item in list" :key="item.accountId" :singer-data="item" />
				</van-list>
			</van-pull-refresh>
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import { singerType, araeList } from '@/utils/enum'
	import { onClickLeft } from '@/utils/back' 
	import {
		reqSingerList
	} from '@/api/singer'
	import {
		ref
	} from 'vue'
	import SingerItem from './components/singerItem.vue'
	import type { singerInterface } from '@/types/public/singer'
	const pushLoading = ref < boolean > (false)
	const loading = ref < boolean > (false)
	const type = ref<number>(-1) // 歌手类型
	const area  = ref<number>(-1) // 歌手地区
	let limit = 30
	let page = 0
	const list = ref<singerInterface[]>([])
	const finished = ref < boolean > (false)

	function getList(): void {
		const data = {
			limit: limit,
			offset: page * limit,
			area: area.value,
			type: type.value
		}
		loading.value = true
		reqSingerList(data)
			.then(res => {
				list.value = list.value.concat(res.data.artists)
				finished.value = !res.data.more
				if (res.data.more) {
					page++
				}
			})
			.finally(() => {
				loading.value = false
				pushLoading.value = false
			})
	}

	function onLoad() {
		getList()
	}

	function onRefresh() {
		pushLoading.value = true
		page = 0
		list.value = []
		getList()
	}
</script>

<style scoped lang="less">
	.singer {
		height: 100%;
		overflow: auto;
	}
</style>
