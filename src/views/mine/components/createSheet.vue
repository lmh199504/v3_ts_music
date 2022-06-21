<template>
	<div class="create_sheet">
		<div class="menu">
			<div class="text">创建歌单（{{ total }}）个</div>
			<div class="flex_box_center_column" @click="handleCreate">
				<van-icon name="plus" />
			</div>
		</div>
		<van-list v-model:loading="loading" :finished="finished"  @load="onLoad">
			<SheetItem v-for="item in list" :key="item.id" :hide-edit="false" :show-edit="true" :sheet-data="item" @delsuccess="delSuccess(item.id)" @edit="edit(item)" />
		</van-list>
		
		<CreatePopup v-model:showPopup="show" @success="refreshList" />
	</div>
</template>

<script setup lang="ts">
	import CreatePopup from './createPopup.vue'
	import SheetItem  from './sheetItem.vue'
	import { ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { reqUserPlayList, reqUserSubCount } from '@/api/user'
	import { useRouter } from 'vue-router'
	import { useUserStore } from '@/store'
	import type { SheetDataInterface } from '@/types/public/sheet'
	const userStore = useUserStore()
	const { userInfo } = storeToRefs(userStore)
	const show = ref<boolean>(false)
	const list = ref<SheetDataInterface[]>([]) // 列表
	const limit = 30 // 条数
	let offset = -1 // 分页
	const total = ref<number>(0) // 总条数
	const loading = ref<boolean>(true)
	const finished = ref<boolean>(false)
	const router = useRouter()
	
	function getList() {
		const params = {
			uid: userInfo.value.userId,
			limit: limit,
			offset: limit * offset,
			time: Date.now()
		}
		loading.value = true
		reqUserPlayList(params)
		.then(res => {
			list.value = list.value.concat(res.data.playlist.filter((item: SheetDataInterface) => item.creator.userId === userInfo.value.userId))
			finished.value = !res.data.more
		})
		.finally(() => {
			loading.value = false
		})
	}
	// 获取总条数
	function getCount() {
		reqUserSubCount()
		.then(res => {
			total.value = res.data.createdPlaylistCount
		})
	}
	function onLoad() {
		offset++
		getList()
	}
	
	function handleCreate() {
		show.value = true
	}
	function refreshList() {
		offset = 0
		list.value = []
		getList()
	}
	function delSuccess(id: number) {
		const index = list.value.findIndex(item => item.id === id)
		list.value.splice(index, 1)
		total.value -= 1
	}
	// 编辑
	function edit(item: SheetDataInterface) {
		router.push({
			path: '/editSheet',
			query: {
				id: item.id
			}
		})
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
				font-size: 28px;
				margin-right: 10px;
				color: var(--my-text-color-gray);
			}
		}
	}
</style>