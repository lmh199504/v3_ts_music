<template>
	<div class="input_code">
		<van-nav-bar title="手机号登录" fixed placeholder left-arrow @click-left="onClickLeft" />
		<div class="input_text">请输入验证码</div>
		<div class="send_text">已发送至：{{ phoneStr }}</div>
		<VerifyCode v-model:code="code" :len="4" />
	</div>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue'
	import VerifyCode from '@/components/VerifyCode'
	import { useRouter } from 'vue-router'
	import { useUserStore } from '@/store'
	const userStore = useUserStore()
	const router = useRouter()
	const onClickLeft = () => {
		router.back()
	}
	
	const loginPhone = sessionStorage.getItem('loginPhone')
	if (!loginPhone) {
		onClickLeft()
	}
	const phoneStr = ref<string>(loginPhone)
	const code = ref<number>('')
	watch(code, (val) => {
		if (val.length == 4) {
			userStore.loginByPhone({
				phone: loginPhone,
				captcha: code.value
			})
		}
	})
</script>

<style scoped lang="less">
	.input_code{
		padding: 30px;
		height: 100vh;
		box-sizing: border-box;
		.input_text{
			padding-top: 30px;
			font-size: 28px;
			letter-spacing: 2px;
		}
		.send_text{
			font-size: 28px;
		}
	}
</style>