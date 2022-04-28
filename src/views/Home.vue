<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		{{ token }}
		<div>{{ isLogin }}</div>
		<van-button type="primary">dsfads</van-button>
	</div>
</template>

<script lang="ts" setup>
	import { useUserStore } from '@/store'
	import { storeToRefs } from 'pinia'
	const userStore = useUserStore()
	const { token, isLogin } = storeToRefs(userStore)
</script>

<style scoped lang="less">
	.home{
		height: 100px;
	}
</style>