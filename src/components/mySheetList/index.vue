<template>
	<van-popup v-model:show="showPop" teleport="body" round append-to-body position="bottom">
		<div class="content">
			<div class="title">选择歌单</div>
			<div class="scroll">
				<van-list v-model:loading="loading" :finished="finished"  @load="onLoad">
					<SheetItem v-for="item in list" :key="item.id" :sheet-data="item" @select="select(item)" />
				</van-list>
			</div>
		</div>
	</van-popup>
</template>

<script setup lang="ts">
	import { computed, ref, WritableComputedRef } from 'vue'
	import SheetItem from './sheetItem.vue'
	import { storeToRefs } from 'pinia'
	import { reqUserPlayList } from '@/api/user'
	import { useUserStore } from '@/store'
	import type { SheetDataInterface } from '@/types/public/sheet'

	const userStore = useUserStore()
	const { userInfo } = storeToRefs(userStore)
	interface Props{
		show: boolean
	}
	const props = withDefaults(defineProps<Props>(), {
		show: false
	})
	const emit = defineEmits<{
		(e: 'update:show', value: boolean): void,
		(e: 'play'): void,
		(e: 'select', value: SheetDataInterface): void
	}>()
	const showPop: WritableComputedRef<boolean> = computed({
		get() {
			return props.show
		},
		set(val) {
			emit('update:show', val)
		}
	}) 

	const list = ref<Array<SheetDataInterface>>([])
	const limit = 30
	let offset = 0
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
			list.value = list.value.concat(res.data.playlist.filter((item: SheetDataInterface) => item.creator.userId === userInfo.value.userId))
			finished.value = !res.data.more
		})
		.finally(() => {
			loading.value = false
		})
	}
	function onLoad() {
		offset++
		getList()
	}
	
	function select(item: SheetDataInterface) {
		emit('select', item)
	}

	getList()
	
</script>

<style scoped lang="less">
	.content{
		padding: 30px;
		height: 60vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.title{
			font-size: 28px;
			color: var(--my-text-color-black);
			padding: 10px 0;
		}
		.scroll{
			flex: 1;
			overflow: auto;
		}
	}
</style>
