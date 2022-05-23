<template>
	<div class="swiper">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item) in imgList" :key="item.bannerId">
				<img :src="item.pic" :alt="item.typeTitle" class="swiper_img">
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script lang="ts" setup>
	import { reqBanner } from '@/api/home'
	import { ref } from 'vue'
	const imgList = ref([])
	reqBanner()
	.then(res => {
		imgList.value = res.data.banners
	})
</script>

<style scoped lang="less">
	.swiper{
		background-image: linear-gradient(#e8e9eb, #fff);
		padding: 20px;
	}
	.my-swipe{
		.swiper_img{
			width: 100%;
			height: 260px;
			border-radius: 15px;
		}
	}
</style>
