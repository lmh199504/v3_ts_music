<template>
	<div class="sideMenu" @click="(e) => e.stopPropagation()">
		<div>
			<!-- 已经登录了 -->
			<div class="user_info" v-if="isLogin">
				<div class="left">
					<img class="avatarUrl" :src="userInfo.avatarUrl" alt="">
					<div class="nickname">{{ userInfo.nickname }}</div>
					<div class="flex_box_center_column">
						<van-icon name="arrow" />
					</div>
				</div>
				<div class="right flex_box_center_column">
					<i class="iconfont icon-iconfontscan"></i>
				</div>
			</div>
			<!-- 还没有登录 -->
			<div v-if="!isLogin">
				<div class="unlogin" @click="toLogin">
					<div>
						<i class="iconfont icon-morentouxiang"></i>
					</div>
					<div class="text">
						前往登录
					</div>
				</div>
			</div>
			<div class="box-container">
				<van-cell-group inset v-if="isLogin">
					<van-cell title="我的消息" is-link to="/msg">
						<template #icon>
							
							<i class="iconfont icon-xiaoxitongzhi"></i>
						</template>
						<template #value>
							<van-badge :content="newMsgCount" :offset="[-15, -5]" :show-zero="false" >
								<div></div>
							</van-badge>
						</template>
					</van-cell>
					<van-cell title="云贝中心" is-link>
						<template #icon>
							<i class="iconfont icon-yun_o"></i>
						</template>
					</van-cell>
					<van-cell title="创作者中心" is-link>
						<template #icon>
							<i class="iconfont icon-dengpao"></i>
						</template>
					</van-cell>
				</van-cell-group>
			</div>
			<div class="box-container">
				<van-cell-group inset>
					<van-cell title="音乐服务">
						<template #title>
							<span class="box_title">音乐服务</span>
						</template>
					</van-cell>
					<van-cell title="云村有票" is-link>
						<template #icon>
							<i class="iconfont icon-youhuobaopiaoju"></i>
						</template>
					</van-cell>
					<van-cell title="商城" is-link>
						<template #icon>
							<i class="iconfont icon-shangcheng"></i>
						</template>
					</van-cell>
					<van-cell title="Beat交易平台" is-link>
						<template #icon>
							<i class="iconfont icon-zhongchengdujiaoyi"></i>
						</template>
					</van-cell>
					<van-cell title="游戏专区" is-link>
						<template #icon>
							<i class="iconfont icon-youxi"></i>
						</template>
					</van-cell>
					<van-cell title="口袋彩铃" is-link>
						<template #icon>
							<i class="iconfont icon-icon--"></i>
						</template>
					</van-cell>
				</van-cell-group>
			</div>
			<div class="box-container">
				<van-cell-group inset>
					<van-cell title="其他设置">
						<template #title>
							<span class="box_title">其他设置</span>
						</template>
					</van-cell>
					<van-cell title="设置" is-link>
						<template #icon>
							<i class="iconfont icon-shezhi"></i>
						</template>
					</van-cell>
					<van-cell title="夜间模式">
						<template #icon>
							<i class="iconfont icon-yejianmoshi"></i>
						</template>
						<template #value>
							<div class="flex_box_center_column" style="align-items: flex-end;height: 100%;">
								<van-switch v-model="checked" active-color="#404341" size="small" />
							</div>
						</template>
					</van-cell>
				</van-cell-group>
			</div>
			<van-button v-if="isLogin" block round class="out-btn" :loading="btnLoading" @click="logout">退出登录</van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Mode } from '@/store/system'
	import {
		computed, ref
	} from 'vue'
	import {
		useUserStore, useSystemStore, useMsgStore
	} from '@/store'
	import {
		storeToRefs
	} from 'pinia'
	import { useRouter } from 'vue-router'
	const useStore = useUserStore()
	const systemStore = useSystemStore()
	const msgStore = useMsgStore()
	const {
		isLogin,
		userInfo
	} = storeToRefs(useStore)
	const { newMsgCount } = storeToRefs(msgStore)
	const router = useRouter()
	const checked = computed({
		get() {
			systemStore.setMode(systemStore.mode)
			return systemStore.mode == 'dark' ? true : false
		},
		set(val) {
			changeMode(val)
		}
	})
	
	function changeMode(value: boolean) {
		if (!value) {
			systemStore.setMode(Mode.light)
		} else {
			systemStore.setMode(Mode.dark)
		}
	}
	
	const btnLoading = ref<boolean>(false)
	function logout() {
		btnLoading.value = true
		useStore.logout()
		.then(() => {
			btnLoading.value = false
		})
		.catch(() => {
			btnLoading.value = false
		})
	}
	function toLogin() {
		router.push({
			path: '/login'
		})
	}
</script>

<style scoped lang="less">
	.sideMenu {
		height: 100%;
		width: 100%;
		padding: 30px;
		background: var(--my-back-color-gray);
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;

		.user_info {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;
				font-size: 28px;

				.avatarUrl {
					width: 80px;
					height: 80px;
					border-radius: 50%;
					margin-right: 10px;
				}

				.nickname {
					font-size: 28px;
					color: var(--my-text-color-black);
				}
				:deep(.van-icon){
					color: var(--my-text-color-black);
				}
			}

			.right {
				.iconfont {
					font-size: 30px;
					color: var(--my-text-color-black);
				}
			}
		}

		.box-container {
			margin-top: 40px;

			:deep(.van-cell-group--inset) {
				margin: auto;
			}

			.box_title {
				color: #999;
				font-size: 24px;
			}

			.iconfont {
				font-size: 30px;
				margin-right: 5px;
			}
		}

		.out-btn {
			margin-top: 30px;
			color: var(--my-primary-color);
		}
		.unlogin{
			display: flex;
			align-items: center;
			.iconfont{
				font-size: 60px;
				color: var(--my-text-color-black);
			}
			.text{
				margin-left: 20px;
				font-size: 30px;
				color: var(--my-text-color-black);
			}
		}
	}
</style>
