<template>
	<div class="scrollView">
		<div class="scroll_wrapper" ref="wrapper">
			<div class="scroll_content">
				<img src="../../assets/images/public/heijiao.png" alt="" class="banner" :style="scaleObj" ref="banner">
				<div v-for="i in 100" :key="i">i</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import BScroll from 'better-scroll'
	import { onMounted, ref, computed } from 'vue'
	const wrapper = ref<HTMLElement>()
	const banner = ref<HTMLElement>()
	const scaleNum = ref<number>(1)
	const scaleObj = computed(() => {
		return { transform: `scale(${ scaleNum.value })` }
	})
	const clientHeight = ref<number>(0)
	onMounted(() => {
		const bs = new BScroll(wrapper.value, {
			probeType: 2
		})
		console.log(banner.value.clientHeight)
		clientHeight.value = banner.value.clientHeight
		bs.on('scroll', (position) => {
			console.log(position)
			if (position.y > 0) {
				scaleNum.value = position.y / clientHeight.value + 1
			} else {
				scaleNum.value = 1
			}
		})
		bs.on('scrollEnd', (posistion) => {
			console.log(posistion)
			if (Math.abs(posistion.y) == 0) {
				scaleNum.value = 1
			}
		})
	})
</script>

<style scoped lang="less">
	.scroll_wrapper{
		height: 100vh;
		background: #f9f;
		overflow: hidden;
		.banner{
			transition: all 0.4s ease;
			width: 100%;
			height: 400px;
		}
	}
</style>