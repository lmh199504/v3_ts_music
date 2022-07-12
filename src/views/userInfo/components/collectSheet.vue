<template>
	<div class="create_sheet box_white_container">
		<div class="menu">
			<div class="title">收藏歌单</div>
		</div>
		<van-list v-model:loading="loading" :finished="finished"  @load="onLoad">
			<SheetItem v-for="item in list" :key="item.id" :sheet-data="item" :hide-edit="true" :show-edit="false" />
		</van-list>
	</div>
</template>

<script setup lang="ts">
	import SheetItem  from '@/views/mine/components/sheetItem.vue'
	import { ref } from 'vue'

	import { reqUserPlayList } from '@/api/user'

	import type { SheetDataInterface } from '@/types/public/sheet'
    interface Props{
        userId: number
    }
    const props = withDefaults(defineProps<Props>(), {
        userId: 0
    })
	const list = ref<Array<SheetDataInterface>>([])
	const limit = 30
	let offset = -1

	const loading = ref<boolean>(true)
	const finished = ref<boolean>(false)
	function getList() {
		const params = {
			uid: props.userId,
			limit: limit,
			offset: limit * offset,
			time: Date.now()
		}
		loading.value = true
		reqUserPlayList(params)
		.then(res => {
			list.value = list.value.concat(res.data.playlist)
			finished.value = !res.data.more
		})
        .catch(() => {
			finished.value = true
		})
		.finally(() => {
			loading.value = false
		})
	}
	function onLoad() {
		offset++
		getList()
	}
</script>

<style scoped lang="less">
	.create_sheet{
		.menu{
			display: flex;
			justify-content: space-between;
			padding: 10px;
			.title{
                font-size: 30px;
                color: var(--my-text-color-black);
                font-weight: bold;
                margin-bottom: 20px;
                span{
                    margin-left: 10px;
                    font-size: 26px;
                    color: var(--my-text-color-gray);
                }
            }
			.iconfont{
				font-size: 28px;
				margin-right: 10px;
				color: var(--my-text-color-gray);
			}
		}
	}
</style>