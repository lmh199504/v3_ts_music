<template>
	<div class="digitAlbum">
		<div class="top">
			<div class="title">
				<div>数字单曲榜</div>
				<div class="flex_box_center_column">
					<van-icon name="arrow" />
				</div>
			</div>
			<div class="menu">
				<div class="menu_item" @click="tapMenu(item.type)" :class="{ 'menu_item_active': item.type == type }" v-for="item in menuList" :key="item.type">{{ item.name }}</div>
			</div>
		</div>
		<van-row>
			<van-col :span="8" v-for="item in list"  :key="item.albumId" >
				<AlbumItem :album-data="item" />
			</van-col>
		</van-row>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { reqDigitAlbum } from '@/api/album'
	import { albumDataInterface } from '@/types/public/album'
	import AlbumItem from './albumItem.vue'
	const menuList = ref([
		{ name: '日榜', type: 'daily' },
		{ name: '周榜', type: 'week' },
		{ name: '总榜', type: 'total' }
	])
	const type = ref<string>('daily')
	const list = ref<Array<albumDataInterface>>([])
	function tapMenu(typeStr :string) :void {
		type.value = typeStr
		getDigitAlbum()
	}
	
	function getDigitAlbum() {
		const data = {
			limit: 6,
			type: type.value,
			albumType: 1
		}
		reqDigitAlbum(data)
		.then(res => {
			list.value = res.data.products.filter((item: albumDataInterface, index: number) :boolean => index < 6)
		})
	}
	getDigitAlbum()
	
	
</script>

<style scoped lang="less">
	.digitAlbum{
		margin-bottom: 20px;
		.top{
			display: flex;
			padding: 0 15px;
			margin-bottom: 10px;
			align-items: center;
			justify-content: space-between;
			.title{
				font-size: 36px;
				color: var(--my-text-color-black);
				display: flex;
				align-items: center;
				font-weight: bold;
			}
			.menu{
				display: flex;
				font-size: 26px;
				.menu_item{
					color: var(--my-text-color-black);
					padding: 0 15px;
					border-right: 1px solid var(--my-text-color-gray);
					&:last-child{
						border: none;
					}
				}
				.menu_item_active{
					color: var(--my-primary-color);
				}
			}
		}
	}
</style>