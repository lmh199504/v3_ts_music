<template>
	<van-pull-refresh v-model="reloading" @refresh="onRefresh">
		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-row>
				<van-col :span="8" v-for="item in list" :key="item.id">
					<SheetItem :sheet-data="item" />
				</van-col>
			</van-row>
		</van-list>
	</van-pull-refresh>
</template>

<script setup lang="ts">
	import SheetItem from './sheetItem.vue'
	import type { SheetDataFace } from '@/types/public'
	import {
		reqSheetList
	} from '@/api/song'
	import {
		ref
	} from 'vue'
	interface Props {
		cat: string
	}

	const props = withDefaults(defineProps < Props > (), {
		cat: ''
	})
	const reloading = ref < boolean > (false)
	const loading = ref < boolean > (false)
	const list = ref<SheetDataFace[]>([])
	let updateTime = 0
	let total = 0
	const finished = ref<boolean>(false)

	function getList() {
		const data = {
			cat: props.cat,
			before: updateTime
		}
		loading.value = true
		reqSheetList(data)
			.then(res => {
				list.value = list.value.concat(res.data.playlists)
				updateTime = res.data.playlists[res.data.playlists.length - 1].updateTime
				total = res.data.total
				if (list.value.length >= total) {
					finished.value = true
				} else {
					finished.value = false
				}
			})
			.finally(() => {
				reloading.value = false
				loading.value = false
			})
	}

	function onRefresh() {
		list.value = []
		reloading.value = true
		finished.value = true
		updateTime = 0
		getList()
	}
	function onLoad() {
		getList()
	}
</script>

<style>
</style>
