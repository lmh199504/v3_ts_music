<template>
	<div class="create_sheet">
		<div class="menu">
			<div class="text">收藏歌单（{{ total }}）个</div>
			<div class="flex_box_center_column">
				<van-icon name="plus" />
			</div>
		</div>
		<van-list v-model:loading="loading" :finished="finished"  @load="onLoad">
			<SheetItem v-for="item in list" :key="item.id" :sheet-data="item" />
		</van-list>
	</div>
</template>

<script setup lang="ts">
	import SheetItem  from './sheetItem.vue'
	import { ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { reqUserPlayList, reqUserSubCount } from '@/api/user'
	import { useUserStore } from '@/store'
	const userStore = useUserStore()
	const { userInfo } = storeToRefs(userStore)
	const list = ref([])
	const limit = 30
	let offset = 0
	const total = ref<number>(0)
	const loading = ref<boolean>(true)
	const finished = ref<boolean>(false)
	function getList() {
		const params = {
			uid: userInfo.value.userId,
			limit: limit,
			offset: limit * offset
		}
		loading.value = true
		reqUserPlayList(params)
		.then(res => {
			list.value = list.value.concat(res.data.playlist.filter(item => item.creator.userId != userInfo.value.userId))
			if (list.value.length >= total.value) {
				finished.value = true
			} else {
				finished.value = false
			}
		})
		.finally(() => {
			loading.value = false
		})
	}
	function getCount() {
		reqUserSubCount()
		.then(res => {
			total.value = res.data.subPlaylistCount
			getList()
		})
	}
	function onLoad() {
		offset++
		getList()
	}
	getCount()
	
	
</script>

<style scoped lang="less">
	.create_sheet{
		.menu{
			display: flex;
			justify-content: space-between;
			padding: 10px;
			.text{
				font-size: 26px;
				color: var(--my-text-color-gray);
			}
			:deep(.van-icon){
				font-size: 30px;
				color: var(--my-text-color-gray);
			}
		}
	}
</style>