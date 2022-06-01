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
		useRouter
	} from 'vue-router'
	import {
		ref
	} from 'vue'
	import { reqTopList } from '@/api/toplist'
	import TopItem from './components/topItem.vue'
	const active: number = ref(0)
	const router = useRouter()
	const tags = ref([])
	function getTopList() {
		reqTopList()
		.then(res => {
			tags.value = res.data.list
		})
	}
	
	function onClickLeft() {
		router.back()
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
