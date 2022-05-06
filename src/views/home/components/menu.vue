<template>
	<div class="menu_wrapper" @touchmove="scroll">
		<div class="menu_list" ref="menuListRef">
			<div class="menu_item" v-for="(item, index) in menuList" :key="index">
				<div class="icon_wrapper flex_box_center_column"><i class="iconfont" :class="item.icon"></i></div>
				<div class="menu_name">{{ item.name }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	const menuList = ref([{
		name: '每日推荐',
		icon: 'icon-rili'
	},
	{
		name: '私人FM',
		icon: 'icon-shouyinji'
	},
	{
		name: '歌单',
		icon: 'icon-24gf-playlistMusic2'
	},
	{
		name: '排行榜',
		icon: 'icon-paihangbang'
	},
	{
		name: '直播',
		icon: 'icon-zhiboshenqing'
	},
	{
		name: '数字专辑',
		icon: 'icon-zhuanji'
	}
	])
	function scroll(e: Event): void {
		e.stopPropagation()
	}
</script>

<style scoped lang="less">
	.menu_wrapper{
		padding: 20px 0;
		box-sizing: border-box;
		background: #fff;
		width: 100%;
		overflow-x: scroll;
		// margin-top: 10px;
		&::-webkit-scrollbar {
			//滚动条的高度
			height: 0px;
		} 
		.menu_list{
			display: flex;
			.menu_item{
				flex-shrink: 0;
				min-width: 130px;
				display: flex;
				flex-direction: column;
				align-items: center;
				.icon_wrapper{
					background: #fef1f1;
					width: 80px;
					height: 80px;
					border-radius: 50%;
				}
				.iconfont{
					color: #e20001;
					font-size: 40px;
				}
			}
			.menu_name{
				font-size: 24px;
				color: #999;
				margin-top: 10px;
			}
		}
	}
</style>