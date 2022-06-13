<template>
	<div>
		综合
	</div>
</template>

<script setup lang="ts">
	import { reqSearchByType } from '@/api/search'
	
	interface Props{
		keyword: string;
		type: number
	}
	const props = withDefaults(defineProps<Props>(), {
		keyword: ''
	})
	function getData() {
		reqSearchByType({ keywords: props.keyword, type: props.type })
	}
	getData()
</script>

<style>
</style>