<template>
	<MiniPlayOut>
		<div class="sheetSquare">
			<van-nav-bar title="歌单广场" left-arrow fixed placeholder @click-left="onClickLeft" />
			<van-tabs v-model:active="active" sticky offset-top="1.22667rem">
				<van-tab :title="item.name" v-for="item in tags" :key="item.id" >
					<SheetList :cat="item.name" />
				</van-tab>
			</van-tabs>
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import {
		ref, Ref
	} from 'vue'
	import { reqSheetTags } from '@/api/song'
	import { onClickLeft } from '@/utils/back' 
	import SheetList from './components/sheetList.vue'

	interface SheetTags{
		name: string
		id: number
	}
	const active: Ref<number> = ref(0)
	const tags = ref<SheetTags[]>([])
	function getSheetTags() {
		reqSheetTags()
		.then(res => {
			tags.value = res.data.tags
		})
	}
	getSheetTags()
</script>

<style scoped lang="less">
	.nav-right{
		padding: 0 20px;
		box-shadow: 0 0 20px 0 rgba(136,137,140,.33);
		.iconfont{
			font-size: 30px;
			color: var(--my-text-color-black);
		}
		
	}
	.sheetSquare{
		height: 100%;
		overflow: auto;
	}
</style>
