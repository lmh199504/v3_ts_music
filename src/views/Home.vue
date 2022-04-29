<template>
	<div class="home">
		{{ token }}
		<div>{{ count }}</div>
		<van-button type="primary" @click="tapFun">dsfads</van-button>
	</div>
</template>

<script lang="ts" setup>
	import { useUserStore } from '@/store'
	import { storeToRefs } from 'pinia'
	const userStore = useUserStore()
	const { token, count } = storeToRefs(userStore)
	const tapFun = () => {
		userStore.setCount()
	}
</script>

<style scoped lang="less">
	.home{
		height: 100px;
	}
</style>