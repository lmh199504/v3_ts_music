<template>
	<MiniPlayOut>
		<div class="sheetSquare">
			<van-nav-bar title="数字专辑" left-arrow fixed placeholder @click-left="onClickLeft" />
			<Banner />
			<NewAlbum />
			<DigitAlbum />
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import NewAlbum from './components/newAlbum.vue'
	import DigitAlbum from './components/digitAlbum.vue'
	import Banner from '@/views/home/components/swiper'
	import { useRouter } from 'vue-router'
	const router = useRouter()
	function onClickLeft() {
		router.back()
	}
</script>

<style scoped lang="less">
	.sheetSquare{
		height: 100%;
		overflow: auto;
		padding: 15px;
		box-sizing: border-box;
	}
</style>