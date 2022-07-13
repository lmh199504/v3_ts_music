<template>
	<div class="input_code">
		<van-nav-bar title="手机号登录" fixed placeholder left-arrow @click-left="onClickLeft" />
		<div class="input_text">请输入验证码</div>
		<div class="send_text">已发送至：{{ phoneStr }}</div>
		<VerifyCode v-model:code="code" :len="4" />
	</div>
</template>

<script setup lang="ts">
import { Toast } from 'vant'
import { ref, watch } from 'vue'
import VerifyCode from '@/components/VerifyCode/index.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { onClickLeft } from '@/utils/back'
const userStore = useUserStore()
const router = useRouter()

const loginPhone = sessionStorage.getItem('loginPhone') || ''
if (!loginPhone) {
	onClickLeft()
}
const phoneStr = ref<string>(loginPhone)
const code = ref<number| undefined>()
watch(code, (val) => {
	if ((val+'').length == 4) {
		Toast.loading('登录中...')
		userStore.loginByPhone({
			phone: loginPhone,
			captcha: Number(code.value)
		})
		.then(() => {
			Toast.clear()
			router.replace('/')
		})
		.catch(() => {
			Toast.clear()
		})
	}
})
</script>

<style scoped lang="less">
.input_code {
	padding: 30px;
	height: 100vh;
	box-sizing: border-box;
	background: var(--my-back-color-white);

	.input_text {
		padding-top: 30px;
		font-size: 28px;
		letter-spacing: 2px;
		color: var(--my-text-color-black);
	}

	.send_text {
		font-size: 28px;
		color: var(--my-text-color-black);
	}
}
</style>