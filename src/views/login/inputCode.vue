<template>
	<div class="input_code">
		<van-nav-bar title="手机号登录" fixed placeholder left-arrow @click-left="onClickLeft" />
		<VerifyCode />
	</div>
</template>

<script setup lang="ts">
	import VerifyCode from '@/components/VerifyCode'
	import { useRouter } from 'vue-router'
	const router = useRouter()
	const onClickLeft = () => {
		router.back()
	}
</script>

<style scoped lang="less">
	.input_code{
		padding: 30px;
		height: 100vh;
		box-sizing: border-box;
	}
</style>