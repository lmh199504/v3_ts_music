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
	const router = useRouter()
	const onClickLeft = () => {
		router.back()
	}
	const phone = ref<number>()
	
	function sendCode() {
		const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
		if (reg.test(phone.value)) {
			reqSendCode({ phone: phone.value })
			.then(res => {
				console.log(res)
			})
		} else {
			router.push('/inputCode')
			Toast('请输入正确的手机号')
		}
	}
	
</script>

<style scoped lang="less">
	.phone_login {
		height: 100vh;
		padding: 30px;
		box-sizing: border-box;
		.more_marvellous{
			color: #333;
			font-size: 26px;
			font-weight: bold;
		}
		.phone_form{
			border-bottom: 1px solid #e0e0e0;
			margin-bottom: 100px;
		}
	}
</style>
