<template>
	<div class="login">
		<van-nav-bar left-arrow title="登录方式" @click-left="onClickLeft" fixed placeholder></van-nav-bar>
		<div class="logo">
			<img src="../../assets/images/public/logo.jpg" alt="">
		</div>
		<div class="btn_wrapper">
			<router-link to="/phoneLogin">
				<van-button block round>手机登录</van-button>
			</router-link>
			
			<router-link to="/emailLogin">
				<van-button block round>邮箱登录</van-button>
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onClickLeft } from '@/utils/back'
</script>

<style scoped lang="less">
	.login{
		height: 100vh;
		background-color: var(--my-back-color-white);
		padding: 60px;
		box-sizing: border-box;
		.logo{
			padding-top: 50px;
			margin-bottom: 60px;
			text-align: center;
			img{
				width: 200px;
				border-radius: 10px;
			}
		}
		.btn_wrapper{
			:deep(.van-button){
				margin-bottom: 30px;
			}
		}
	}
</style>