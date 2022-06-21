<template>
	<div class="user_item">
		<div class="left">
			<div class="coverImg">
				<img :src="userData.avatarUrl + '?param=140y140'" alt="">
			</div>
			<div class="singer_name">{{ userData.nickname }}</div>
		</div>
		<div class="right">
			
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { UserInterface } from '@/types/public/user'
	interface Props{
		userData: UserInterface
	}
	withDefaults(defineProps<Props>(), {
		userData: () => { return {
			nickname: 'string',
			userId: 0,
			avatarUrl: '',
			followed: false
			}
		}
	})

	
</script>

<style scoped lang="less">
	.user_item{
		padding: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--van-cell-border-color);
		.left{
			display: flex;
			align-items: center;
			.coverImg{
				width: 100px;
				height: 100px;
				overflow: hidden;
				border-radius: 50%;
				margin-right: 20px;
				img{
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.singer_name{
				font-size: 28px;
				color: var(--my-text-color-black);
			}
		}
	}
</style>