<template>
	<div>
		<van-tabs v-model:active="active" sticky offset-top="1.2rem">
			<van-tab :title="item.name" v-for="item in searchType" :key="item.type">
				<div class="reslut_container">
					<component :is="item.component" :keyword="keyword" :type="item.type" @switchActive="switchActive" />
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script setup lang="ts">
	import { searchType } from '@/utils/enum'
	import { ref } from 'vue'
	interface Props{
		keyword: string;
	}
	withDefaults(defineProps<Props>(), {
		keyword: ''
	})
	const active = ref<number>(0)
	
	function switchActive(index: number) {
		active.value = index
	}
</script>

<style scoped lang="less">
.reslut_container{
	padding: 30px;
	box-sizing: border-box;
	background: var(--my-back-color-gray);
	min-height: calc(100vh - 180px);
	padding-bottom: 100px;
}
</style>