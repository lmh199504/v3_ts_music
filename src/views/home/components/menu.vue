<template>
	<div class="menu_wrapper" @touchmove="scroll">
		<div class="menu_list" ref="menuListRef">
			<div class="menu_item" v-for="(item, index) in menuList" :key="index" @click="goPath(item.path)">
				<div class="icon_wrapper flex_box_center_column"><i class="iconfont" :class="item.icon"></i></div>
				<div class="menu_name">{{ item.name }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { formatSheet } from '@/utils/song'
import { reqPersonalFm } from '@/api/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '@/store'
import type { songInterface } from '@/types/public'

const router = useRouter()
const playerStore = usePlayerStore()
const menuList = ref([{
	name: '每日推荐',
	icon: 'icon-rili',
	path: '/daysRecommend'
},
{
	name: '私人FM',
	icon: 'icon-shouyinji',
	path: 'personalFm'
},
{
	name: '歌单',
	icon: 'icon-24gf-playlistMusic2',
	path: '/sheetSquare'
},
{
	name: '排行榜',
	icon: 'icon-paihangbang',
	path: '/topList'
},
{
	name: '歌手',
	icon: 'icon-zhiboshenqing',
	path: '/singer'
},
{
	name: '数字专辑',
	icon: 'icon-zhuanji',
	path: '/album'
}
])
function scroll(e: Event): void {
	e.stopPropagation()
}
function goPath(path: string): void {
	if (path === 'personalFm') {
		reqPersonalFm()
			.then(res => {
				const data = res.data.data.map((item: songInterface) => {
					return formatSheet(item)
				})
				playerStore.resetList(data)
			})
		playerStore.setPlayerVisible(true)
		return
	}
	router.push({
		path
	})
}

</script>

<style scoped lang="less">
.menu_wrapper {
	padding: 20px 0;
	box-sizing: border-box;
	background: var(--van-white);
	width: 100%;
	overflow-x: scroll;

	// margin-top: 10px;
	&::-webkit-scrollbar {
		//滚动条的高度
		height: 0px;
	}

	.menu_list {
		display: flex;

		.menu_item {
			flex-shrink: 0;
			min-width: 130px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon_wrapper {
				background: var(--my-home-menu-back);
				width: 80px;
				height: 80px;
				border-radius: 50%;
			}

			.iconfont {
				color: #e20001;
				font-size: 40px;
			}
		}

		.menu_name {
			font-size: 24px;
			color: #999;
			margin-top: 10px;
		}
	}
}
</style>