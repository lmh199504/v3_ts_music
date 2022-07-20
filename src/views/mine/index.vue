<template>
	<div class="mine" @scroll="scroll" ref="mine">
		<van-sticky>
			<div class="nav" :style="navStyle">
				<div class="flex_box_center_column" @click="openMenu">
					<i class="iconfont icon-caidan"></i>
				</div>
				<div class="search_wrapper">
					个人中心
				</div>
				<div class="flex_box_center_column" @click="toSearch">
					<i class="iconfont icon-sousuo"></i>
				</div>
			</div>
		</van-sticky>
		<div class="main_content">
			<template v-if="isLogin">
				<div class="box_white_container user_info">
					<div class="user_img">
						<img :src="userInfo.avatarUrl" alt="">
					</div>
					<div class="user_name">{{  userInfo.nickname }}</div>
					<div class="other_info">
						<div class="other_info_item" @click="toFans"><span>{{ profile.follows }}</span>关注</div>
						<div class="other_info_item" @click="toFans"><span>{{ profile.followeds }}</span>粉丝</div>
						<div class="other_info_item">Lv.{{ level }}</div>
					</div>
				</div>
				
				<div class="box_white_container application_box">
					<van-row>
						<van-col span="6" v-for="item in appList" :key="item.icon" @click="tapApp(item.path)">
							<div class="icon">
								<i class="iconfont" :class="item.icon"></i>
							</div>
							<div class="app_name">{{ item.name }}</div>
						</van-col>
					</van-row>
				</div>
				<LikeList />
				<Sheet />
			</template>
			<template v-else>
				<div class="unlogin">
					<router-link to="/login">
						<van-button block round>登录</van-button>
					</router-link>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { reqUserDetail } from '@/api/user'
	import { storeToRefs } from 'pinia'
	import { ref, reactive, computed } from 'vue'
	import { useUserStore, useSystemStore } from '@/store'
	import $bus from '@/utils/eventBus'
	import LikeList from './components/likeList.vue'
	import Sheet from './components/sheet.vue'
	import { Mode } from '@/store/system'
	import router from '@/router'

	const userStore = useUserStore()
	const systemStore = useSystemStore()
	const { isLogin, userInfo } = storeToRefs(userStore)
	const { mode } = storeToRefs(systemStore)
	const profile = reactive({
		follows: 0,
		followeds: 0
	})
	const level = ref<number>(0)
	const mine = ref<HTMLDivElement | null>(null)
	const appList = computed(() => {
		return [
			{ name: '最近播放', icon: 'icon-bofang1', path: '/recentPlay' },
			{ name: '云盘', icon: 'icon-rili', path: '/cloudDisk' },
			{ name: '我的好友', icon: 'icon-guanzhu', path: `/fansFollows?id=${userInfo.value.userId}` },
			{ name: '收藏和赞', icon: 'icon-paihangbang' },
			{ name: '我的播客', icon: 'icon-zhiboziyuan' },
			{ name: '推歌精选', icon: 'icon-zhiboshenqing' },
			{ name: '本地下载', icon: 'icon-shouyinji' },
			{ name: '已购', icon: 'icon-zhongchengdujiaoyi' },
			{ name: '音乐罐子', icon: 'icon-zhiboshenqing' }
			
		]
	})
	const navStyle = reactive({
		background: 'transparent'
	})
	
	function openMenu(): void {
		$bus.emit('opne_menu')
	}
	
	function Init() {
		if (isLogin.value) {
			getUserDetail()
		}
	}
	function getUserDetail() {
		reqUserDetail({ uid: userInfo.value.userId })
		.then(res => {
			profile.follows = res.data.profile.follows
			profile.followeds = res.data.profile.followeds
			level.value = res.data.level
		})
	}
	
	function scroll() {
		const top = mine.value?.scrollTop || 0
		if (top>50) {
			navStyle.background = 'var(--my-back-color-white)'
		} else if (top == 0) {
			navStyle.background = 'transparent'
		} else {
			if (mode.value == Mode.light) { 
				navStyle.background = `rgba(255,255,255, ${ top*2/100 })`
			} else {
				navStyle.background = `rgba(0,0,0, ${ top*2/100 })`
			}
		}
	}
	function tapApp(path: string | undefined) {
		if (!path) return
		router.push(path)
	}
	
	function toSearch() {
		router.push({
			path: '/search'
		})
	}
	function toFans() {
		router.push({
			path: '/fansFollows',
			query: {
				id: userInfo.value.userId
			}
		})
	}

	Init()
	
</script>

<style scoped lang="less">
	.mine{
		background-color: var(--my-back-color-gray);
		height: 100%;
		overflow: auto;
		padding-bottom: 100px;
		box-sizing: border-box;
		.main_content{
			padding: 30px;
			min-height: 80vh;
		}
		.user_info{
			.user_img{
				height: 100px;
				width: 100px;
				margin: auto;
				margin-top: -60px;
				border-radius: 50%;
				img{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.user_name{
				font-size: 28px;
				font-weight: bold;
				color: var(--my-text-color-black);
				text-align: center;
				margin-top: 15px;
			}
			.other_info{
				display: flex;
				justify-content: center;
				margin-top: 20px;
				.other_info_item{
					padding: 0 20px;
					position: relative;
					font-size: 24px;
					color: var(--my-text-color-gray);
					span{
						margin-right: 5px;
					}
					&:last-child{
						&:after{
							display: none;
						}
					}
					&:after{
						content: "";
						display: block;
						height: 20px;
						width: 2px;
						background: var(--my-text-color-gray);
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
		.nav {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 20px;
			height: 88px;
			background: transparent;
			box-sizing: border-box;
			.iconfont{
				color: var(--my-text-color-black);
				font-size: 40px;
			}
			.search_wrapper {
				font-size: 24px;
				color: var(--my-text-color-black);
			}
		}
		.application_box{
			.icon{
				text-align: center;
				.iconfont{
					font-size: 40px;
					color: var(--my-primary-color);
				}
			}
			.app_name{
				font-size: 24px;
				color: var(--my-text-color-black);
				text-align: center;
			}
		}
	}
	.unlogin{
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 60vh;
	}
</style>