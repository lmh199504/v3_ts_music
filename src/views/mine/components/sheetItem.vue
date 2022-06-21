<template>
	
	<div class="flex_box" @click="goSheetDetail">
		<div class="left">
			<div class="cover">
				<img :src="sheetData.coverImgUrl" alt="">
			</div>
			<div class="info">
				<div class="title">{{ sheetData.name }}</div>
				<div class="total">{{ sheetData.trackCount }}首</div>
			</div>
		</div>
		<div class="flex_box_center_column play_btn">
			<i class="iconfont icon-Androidgengduo" @click.stop="handleMenu" v-if="showEdit"></i>
		</div>
	</div>
	<PopupMenu v-model:showPopup="show" :hide-edit="hideEdit" @del="del" @edit="edit" />
</template>

<script setup lang="ts">
	import { Toast } from 'vant'
	import { reqDelSheet } from '@/api/sheet'
	import { ref } from 'vue'
	import PopupMenu from './popupMenu.vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()
	const show = ref<boolean>(false)
	interface Props{
		// eslint-disable-next-line
		sheetData: any;
		hideEdit: boolean; // 菜单中的编辑
		showEdit: boolean // 菜单
	}
	const props = withDefaults(defineProps < Props > (), {
		sheetData: () => { return {} },
		hideEdit: false,
		showEdit: true
	}) 
	
	const emit = defineEmits<{
		(e: 'delsuccess'):void,
		(e: 'edit'): void
	}>()
	
	function goSheetDetail() {
		router.push({
			path: '/songSheetDetail',
			query: { id: props.sheetData.id }
		})
	}
	function handleMenu() {
		show.value = true
	}
	
	function del() {
		const loading = Toast.loading({
			duration: 0,
			message: '加载中...',
			overlay: true
		})
		reqDelSheet({ id: props.sheetData.id })
		.then(() => {
			emit('delsuccess')
		})
		.finally(() => {
			loading.clear()
		})
	}
	
	function edit() {
		emit('edit')
	}
</script>

<style scoped lang="less">
	.flex_box{
		display: flex;
		justify-content: space-between;
		padding: 30px 10px;
		border-bottom: 1px solid var(--van-cell-border-color);
		overflow: hidden;
		.left{
			display: flex;
			align-items: center;
			.cover{
				width: 100px;
				height: 100px;
				position: relative;
				border-radius: 10px;
				overflow: hidden;
				margin-right: 20px;
				flex-shrink: 0;
				img{
					width: 100%;
					height: 100%;
				}
				.mask{
					position: absolute;
					background: rgba(0, 0, 0, 0.3);
					top: 0;
					left: 0;
					z-index: 1;
					width: 100%;
					height: 100%;
					.iconfont{
						font-size: 30px;
						color: var(--my-back-color-white);
					}
				}
			}
			.info{
				flex: 1;
				overflow: hidden;
			}
			.title{
				font-size: 28px;
				color: var(--my-text-color-black);
				width: 100%;
			}
			.total{
				font-size: 24px;
				color: var(--my-text-color-gray);
			}
			
		}
		.play_btn{
			.iconfont{
				font-size: 28px;
				margin-right: 10px;
				color: var(--my-icon-color);
			}
		}
		&:active{
			opacity: 0.8;
		}
	}
</style>