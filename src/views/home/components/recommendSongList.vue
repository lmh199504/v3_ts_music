<template>
	<div class="recomend">
		<div class="recomend_top">
			<div class="recomend_title">推荐跟单</div>
			<van-button icon="arrow" round size="mini" icon-position="right">更多</van-button>
		</div>
		<div class="sroll_wrapper" ref="scrollRef" @touchmove="scroll">
			<div class="list">
				<SongListItem v-for="item in songsList" :key="item.id" :songListData="item" />
			</div>
		</div>
	</div>
</template>
<!-- 推荐歌单列表 -->
<script setup lang="ts">
	import { reqRecommendList } from '@/api/home'
	import SongListItem from '@/components/songListItem'
	import { ref } from 'vue'
	const songsList = ref([])
	reqRecommendList({ limit: 10 })
	.then(res => {
		songsList.value = res.data.result
	})
	function scroll(e: Event): void {
		e.stopPropagation()
	}
</script>

<style scoped lang="less">
	.recomend{
		background-color: #fff;
		padding: 20px;
		box-sizing: border-box;
		border-radius: 0 15px 15px 0;
		.recomend_top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;
			.recomend_title{
				font-size: 30px;
				font-weight: bold;
			}
		}
		.sroll_wrapper{
			width: 100%;
			overflow-x: scroll;
			&::-webkit-scrollbar {
				//滚动条的高度
				height: 0px;
			} 
			.list{
				display: flex;
			}
		}
	}
</style>