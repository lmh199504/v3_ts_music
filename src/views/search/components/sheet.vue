<template>
	<div class="single_list box_white_container">
		<SheetItem v-for="item in list" :key="item.id" :sheet-data="item" :hide-edit="true" :show-edit="false" />
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { reqSearchByType } from '@/api/search'
	import SheetItem from '@/views/mine/components/sheetItem.vue'
	import type { SheetListFace } from '@/types/public/sheet'
	interface Props{
		keyword: string;
		type: number
	}
	const props = withDefaults(defineProps<Props>(), {
		keyword: ''
	})
	const list = ref<Array<SheetListFace>>([])
	
	async function getData() {
		const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
		list.value = songList.data.result.playlists
	}

	getData()
</script>

<style scoped lang="less">
	.single_list{
		background: var(--my-back-color-white);
	}
</style>