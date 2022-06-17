<template>
	<div class="recomend_item">
		<div class="recomend_top">
			<div class="recomend_title">{{ list.categoryName }}</div>
			<van-button icon="arrow" round size="mini" icon-position="right" @click="getMore">更多</van-button>
		</div>
		<div>
			<div class="sroll_wrapper" ref="scrollRef" @touchmove="scroll">
				<div class="list">
					<DjItem  v-for="item in list.radios" :key="item.id" :dj-data="item" />
				</div>
			</div>
			<DjItem />
		</div>
	</div>
</template>

<script setup lang="ts">
	import DjItem from '@/components/DjItem/index.vue'
	// DjData,
	import type { DjCategoryRecommend } from '@/types/public/dj'
	interface Props{
		list: DjCategoryRecommend
	}
	withDefaults(defineProps<Props>(), {
		list: () => {
			return {
				categoryName: '',
				categoryId: '',
				radios: []
			}
		}
	})
	function getMore() {
		console.log('更多')
	}
</script>

<style scoped lang="less">
	.recomend_item{
		padding: 20px;
		background-color: var(--my-back-color-white);
		margin-bottom: 30px;
	}
	.recomend_top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		.recomend_title{
			font-size: 30px;
			font-weight: bold;
			color: var(--my-text-color-black);
		}
	}
</style>