<template>
	<div class="emailLogin">
		<van-nav-bar fixed left-arrow placeholder title="邮箱登录" @click-left="onClickLeft" />
		<van-form @submit="onSubmit">
			<van-cell-group inset>
				<van-field v-model="email" name="邮箱" label="邮箱" placeholder="邮箱" />
				<van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" />
			</van-cell-group>
			<div style="margin: 16px;">
				<van-button round block type="primary" native-type="submit" :loading="loading" color="#e20001">
					提交
				</van-button>
			</div>
		</van-form>
	</div>
</template>

<script setup lang="ts">
	import {
		useRouter
	} from 'vue-router'
	import { ref } from 'vue'
	import { Toast } from 'vant'
	import { validEmail }  from '@/utils'
	import { useUserStore } from '@/store'
	import { onClickLeft } from '@/utils/back' 
	
	const router = useRouter()
	const userStore = useUserStore()
	const email = ref<string>('');
	const password = ref<string>('');
	const loading = ref<boolean>(false)
	const onSubmit = () => {
		if (!validEmail(email.value)) {
			Toast('请输入正确的邮箱')
			return
		}
		if (!password.value) {
			Toast('请输入密码')
			return
		}
		loading.value = true
		userStore.loginByEmail({ email: email.value, password: password.value })
		.then(() => {
			loading.value = false
			router.replace('/')
		})
		.catch(() => {
			loading.value = false
		})
	}
</script>

<style scoped lang="less">
	.emailLogin {
		background-color: var(--my-back-color-white);
		height: 100vh;
	}
</style>
