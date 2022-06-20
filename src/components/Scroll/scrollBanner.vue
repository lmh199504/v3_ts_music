<template>
	<div class="scrollView">
		<div class="img_wrapper" :style="wrapperStyle">
			<img class="cover_img" :src="imgUrl" :style="imgStyle" ref="banner">
			<div class="btn">
				<slot name="btn"></slot>
			</div>
		</div>
		<div class="layer" ref="layer" :style="layerStyle"></div>
		<div class="scroll_wrapper" ref="wrapper">
			<div class="scroll_content">
				<div class="seize" :style="seizeStyle"></div>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import BScroll from 'better-scroll'
	import {
		onMounted,
		ref,
		watch,
		nextTick,
		defineExpose
	} from 'vue'
	const emit = defineEmits(['scroll', 'scrollEnd'])
	interface Props {
		imgUrl ? : string;
	}
	withDefaults(defineProps < Props > (), {
		imgUrl: 'https://img1.baidu.com/it/u=1966616150,2146512490&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500'
	})

	const wrapper = ref < HTMLElement > () // 滚动容器
	const banner = ref < HTMLElement > () // 图片
	const clientHeight = ref < number > (0) // 图片区域高度
	let originalHeight = 0 // 原始图片高度
	const scrollY = ref < number > (0) // 滚动距离

	const wrapperStyle = ref({}) // 图片容器样式
	const imgStyle = ref({}) // 图片样式
	const layerStyle = ref({}) // 图片位置占位
	const seizeStyle = ref({}) // 滚动容器内占位
	interface Position{
		x: number
		y: number
	}
	// eslint-disable-next-line
	let bs: any = null
	onMounted(() => {
		setTimeout(() => {
			if (wrapper.value) {
				bs = new BScroll(wrapper.value, {
					probeType: 3,
					click: true
				})
				clientHeight.value = banner.value?.clientHeight || 0
				originalHeight = banner.value?.clientHeight || 0
				bs.on('scroll', (position: Position) => {
					scrollY.value = position.y
					emit('scroll', position)
				})
				bs.on('scrollEnd', () => {
					emit('scrollEnd')
				})
			}
		}, 0)
	})
	nextTick(() => {
		bs && bs.refresh()
	})
	function refresh() {
		bs && bs.refresh.apply(bs, arguments)
	}
	watch(scrollY, (val) => {
		if (val >= 0) {
			imgStyle.value = {
				height: originalHeight + val + 'px'
			}
			wrapperStyle.value = {
				height: originalHeight + val + 'px',
			}
			// layerStyle.value = {
			// 	height:  originalHeight + val  + 'px',
			// }
		} else {
			imgStyle.value = {
				height: originalHeight + val + 'px',
			}
			wrapperStyle.value = {
				height: originalHeight + val + 'px'
			}
			layerStyle.value = {
				height: originalHeight + val + 'px',
			}
			seizeStyle.value = {
				height: Math.abs(val) + 'px'
			}
			if (Math.abs(val) > originalHeight) {
				imgStyle.value = {
					height: 0 + 'px',
				}
				wrapperStyle.value = {
					height: 0 + 'px'
				}
				layerStyle.value = {
					height: 0 + 'px',
				}
				seizeStyle.value = {
					height: originalHeight + 'px'
				}
			}
		}
	})
	defineExpose({
		refresh
	})
</script>

<style scoped lang="less">
	.scrollView {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: var(--my-back-color-white);
	}

	.scroll_wrapper {
		height: 100%;
		overflow: hidden;
		flex: 1;
		background-color: var(--my-back-color-white);
		.scroll_content {
			padding-bottom: 100px;
			background-color: var(--my-back-color-white);
			min-height: 100%;
		}
	}

	.img_wrapper {
		width: 100%;
		overflow: hidden;
		height: 400px;
		position: absolute;

		.cover_img {
			width: 100%;
			height: 400px;
			min-height: 100px;
			object-fit: cover;
		}
		.btn{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	.layer {
		height: 400px;
		background-color: var(--my-back-color-white);
	}
</style>
