<template>
	<div class="home">
		{{ token }}
	</div>
</template>

<script lang="ts" setup>
	import { useUserStore } from '@/store'
	import { storeToRefs } from 'pinia'
	const userStore = useUserStore()
	const { token } = storeToRefs(userStore)
</script>

<style scoped lang="less">
	.home{
		height: 100px;
	}
</style>