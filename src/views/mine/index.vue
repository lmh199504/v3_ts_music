<template>
	<div class="mine">
		<Scroll ref="scrollRef" :stopPropagation="true">
			<div class=""></div>
			<div class="box_white_container">
				
			</div>
		</Scroll>
	</div>
</template>

<script lang="ts" setup>
	import Scroll from '@/components/Scroll'
	import { ref, nextTick } from 'vue'
	const scrollRef = ref(null)
	nextTick(() => {
		scrollRef.value.refresh()
	})
</script>

<style scoped lang="less">
	.mine{
		background-color: var(--my-back-color-gray);
		height: 100%;
		overflow: hidden;
		.box_white_container{
			// height: 500vh;
		}
	}
</style>