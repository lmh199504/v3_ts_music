<template>
	<div class="scroll" ref="scrollwrapper">
		<div class="scroll_content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import BScroll from 'better-scroll'
	import { onMounted, ref } from 'vue'
	interface Props{
		probeType: number // 决定是否派发 scroll 事件，对页面的性能有影响，尤其是在 useTransition 为 true 的模式下 0 1 2 3 
	}
	const emit = defineEmits(['scroll'])
	const props = withDefaults(defineProps<Props>(), {
		probeType: 3
	})
	const scrollwrapper = ref<HTMLDivElement>()
	let bs = null;
	onMounted(() => {
		setTimeout(() => {
			bs = new BScroll(scrollwrapper.value, {
				probeType: props.probeType,
				click: true
			})
			console.log(bs)
			bs.on('scroll', (position) => {
				emit('scroll', position)
			})
		}, 100)
	})
	
	
</script>

<style scoped lang="less">
	.scroll{
		height: 100%;
		overflow: hidden;
		.scroll_content{
			height: 100%;
		}
	}
</style>