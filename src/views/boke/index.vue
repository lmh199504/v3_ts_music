<template>
	<div class="box-container">
		<van-tabs v-model:active="active" swipeable sticky>
			<van-tab title="听听">
				<Listen />
			</van-tab>
			<van-tab title="推荐">
				<Suggest />
			</van-tab>
			<van-tab title="故事">
				<Story :cate-id="10001" />
			</van-tab>
			<template #nav-left>
				<div class="tab_right">
					<i class="iconfont icon-caidan" @click="openMenu"></i>
				</div>
			</template>
			<template #nav-right>
				<div class="tab_left">
					<i class="iconfont icon-icon_tianjia"></i>
				</div>
			</template>
		</van-tabs>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import $bus from '@/utils/eventBus'
	import Suggest from './components/suggest/index.vue'
	import Listen from './components/listen/index.vue'
	import Story from './components/story/index.vue'
	const active = ref<number>(1)
	
	// 侧边菜单
	function openMenu(): void {
		$bus.emit('opne_menu')
	}
</script>

<style scoped lang="less">
	.box-container {
		height: 100%;
		overflow: auto;
		padding-bottom: 150px;
		box-sizing: border-box;
		background-color: var(--my-back-color-gray);
		.tab_right{
			box-sizing: border-box;
			padding-left: 30px;
			width: 150px;
			box-sizing: border-box;
			.iconfont{
				font-size: 40px;
				font-weight: 600;
				color: var(--my-text-color-black);
			}
		}
		.tab_left{
			text-align: right;
			box-sizing: border-box;
			padding-right: 30px;
			width: 150px;
			box-sizing: border-box;
			.iconfont{
				font-size: 40px;
				font-weight: 600;
				color: var(--my-text-color-black);
			}
		}
	}
</style>
