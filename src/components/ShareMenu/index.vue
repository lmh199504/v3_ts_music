<template>
	<div class="share_menu">
		<van-share-sheet v-model:show="showShare" title="" :options="options" @select="onSelect" />
	</div>
</template>

<script setup lang="ts">
	import { computed, toRaw } from 'vue'
	import { useSystemStore, usePlayerStore } from '@/store'
	import { storeToRefs } from 'pinia'
	
	const systemStore = useSystemStore()
	const playerStore = usePlayerStore()
	const { showShareMenu, shareSong } = storeToRefs(systemStore)
	const showShare = computed({
		get() {
			return showShareMenu.value
		},
		set(val) {
			systemStore.setVisibleMenu(val)
		}
	}) 
	const options = [
		[{
				name: '微信',
				icon: 'wechat',
				action: 'play'
			},
			{
				name: '朋友圈',
				icon: 'wechat-moments',
				action: 'play'
			},
			{
				name: '微博',
				icon: 'weibo',
				action: 'play'
			},
			{
				name: 'QQ',
				icon: 'qq',
				action: 'play'
			},
		],
		[{
				name: '播放',
				icon: 'link',
				action: 'play'
			},
			{
				name: '分享海报',
				icon: 'poster',
				action: 'play'
			},
			{
				name: '二维码',
				icon: 'qrcode',
				action: 'play'
			},
			{
				name: '小程序码',
				icon: 'weapp-qrcode',
				action: 'play'
			},
		],
	]
	
	function onSelect(option) {
		if (option.action === 'play') {
			playerStore.setCurSong(toRaw(shareSong.value))
			showShare.value = false
		}
	}
</script>

<style scoped lang="less">
	.share_menu{
		:deep(.van-share-sheet__cancel) {
			&::before{
				background-color: var(--my-back-color-gray);
			}	
		}
	}
</style>
