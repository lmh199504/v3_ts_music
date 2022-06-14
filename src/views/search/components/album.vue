<template>
	<div class="single_list box_white_container">
		<AlbumItem v-for="item in list" :key="item.id" :album-data="item"  />
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { reqSearchByType } from '@/api/search'
	import AlbumItem from './albumItem.vue'
	import { AlbumInterface } from '@/types/public/comprehensive'
	interface Props{
		keyword: string;
		type: number
	}
	const props = withDefaults(defineProps<Props>(), {
		keyword: ''
	})
	const list = ref<Array<AlbumInterface>>([])
	
	async function getData() {
		const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
		list.value = songList.data.result.albums
	}

	getData()
</script>

<style scoped lang="less">
	.single_list{
		background: var(--my-back-color-white);
	}
</style>