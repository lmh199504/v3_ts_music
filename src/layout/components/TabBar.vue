<template>
	<div class="tabbar" :class="{ 'hide_tabbar': showBigPlayer }">
		<MiniPlayer v-if="currentSong.url" />
		<van-tabbar route :fixed="false" :border="false" active-color="#e20001">
			<van-tabbar-item replace :to="item.url" v-for="item in menuList" :key="item.icon">
				<span>{{ item.name }}</span>
				<template #icon>
					<i class="iconfont" :class="item.icon"></i>
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script lang="ts" setup>
	import { storeToRefs } from 'pinia'
	import MiniPlayer from '@/components/MiniPlayer/index.vue'
	import { usePlayerStore } from '@/store'
	import { reactive } from 'vue'
	const palyerStore = usePlayerStore()
	const menuList = reactive([
		{ 
			name: '发现',
			url: '/home',
			icon: 'icon-faxian'
		},
		{
			name: '播客',
			url: '/boke',
			icon: 'icon-zhiboziyuan'
		},
		{
			name: '我的',
			url: '/mine',
			icon: 'icon-yinle'
		},
		{
			name: '关注',
			url: '/follow',
			icon: 'icon-guanzhu'
		},
		{
			name: '云村',
			url: '/village',
			icon: 'icon-shequ-active'
		}
	])
	const { showBigPlayer, currentSong } = storeToRefs(palyerStore)
</script>

<style scoped>
	.tabbar{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: -2px 0 20px 0 rgb(0 0 0 / 20%);
		background: #fff;
		z-index: 1;
		transition: all 0.4s ease;
	}
	.hide_tabbar{
		bottom: -200px;
	}
	.iconfont{
		font-size: 30px;
		font-weight: 600;
	}
</style>
