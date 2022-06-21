<template>
	<div class="phone_login">
		<van-nav-bar title="手机号登录" fixed placeholder left-arrow @click-left="onClickLeft" />
		<div class="more_marvellous">
			登录体验更多精彩
		</div>
		<van-form class="phone_form">
			<van-field v-model="phone" placeholder="请输入手机号" type="number" maxlength="11" />
		</van-form>
		
		<van-button color="#e20001" block round @click="sendCode">下一步</van-button>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { reqSendCode } from '@/api/user'
	import { Toast } from 'vant'
	import { onClickLeft } from '@/utils/back' 
	
	const router = useRouter()
	const phone = ref<number>()
	function sendCode() {
		const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
		if (phone.value && reg.test(phone.value + '')) {
			reqSendCode({ phone: phone.value })
			.then(() => {
				sessionStorage.setItem('loginPhone', phone.value + '')
				Toast.success('验证码发送成功')
				router.push('/inputCode')
			})
		} else {
			Toast('请输入正确的手机号')
		}
	}
	
</script>

<style scoped lang="less">
	.phone_login {
		height: 100vh;
		padding: 30px;
		box-sizing: border-box;
		background-color: var(--my-back-color-white);
		.more_marvellous{
			color: var(--my-text-color-black);
			font-size: 26px;
			font-weight: bold;
			padding-top: 30px;
			margin-bottom: 20px;
		}
		.phone_form{
			border-bottom: 1px solid var(--van-button-default-border-color);
			margin-bottom: 100px;
		}
	}
</style>
