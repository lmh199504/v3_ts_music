<template>
	<div class="layout">
		<van-swipe-cell @open="open" @close="close" ref="swipercell" stop-propagation>
			<template #left>
				<SideMenu />
			</template>
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</router-view>
			<TabBar />
			<van-overlay :show="show" />
		</van-swipe-cell>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import TabBar from './components/TabBar.vue'
	import SideMenu from './components/SideMenu.vue'
	import $bus from '@/utils/eventBus'
	import type { SwipeCellInstance } from 'vant'
	const show = ref<boolean>(false)
	const swipercell = ref<SwipeCellInstance>()
	function open(): void {
		show.value = true
	}
	function close(): void {
		show.value = false
	}
	// 打开菜单
	$bus.on('opne_menu', (): void => {
		setTimeout(() => {
			swipercell.value?.open('left')
		})
	})
	
</script>

<style scoped lang="less">
	.layout {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;

		:deep(.van-swipe-cell) {
			height: 100%;

			.van-swipe-cell__wrapper {
				height: 100%;
			}
			.van-swipe-cell__left{
				width: 70vw;
			}
		}
	}
</style>
