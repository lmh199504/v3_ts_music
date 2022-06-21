<!-- 排行榜 -->
<template>
	<MiniPlayOut>
		<div class="sheetSquare">
			<van-nav-bar title="排行榜" left-arrow fixed placeholder @click-left="onClickLeft" />
			<van-tabs v-model:active="active" sticky offset-top="1.22667rem" scrollspy>
				<van-tab :title="item.name" v-for="item in tags" :key="item.id" >
					<TopItem :top-data="item" />
				</van-tab>
			</van-tabs>
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import {
		ref, Ref
	} from 'vue'
	import { reqTopList } from '@/api/toplist'
	import TopItem from './components/topItem.vue'
	import { onClickLeft } from '@/utils/back' 
	const active: Ref<number> = ref(0)
	interface Tag{
		name: string
		id: number
		coverImgUrl: string
	}
	const tags = ref<Tag[]>([])
	function getTopList() {
		reqTopList()
		.then(res => {
			tags.value = res.data.list
		})
	}

	getTopList()
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
