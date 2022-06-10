<template>
	<div class="flex_box" @click="selectThis">
		<div class="left">
			<div class="cover">
				<img :src="sheetData.coverImgUrl" alt="">
			</div>
			<div class="">
				<div class="title">{{ sheetData.name }}</div>
				<div class="total">{{ sheetData.trackCount }}首</div>
			</div>
		</div>
		<div class="flex_box_center_column play_btn">
			
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Props{
		// eslint-disable-next-line
		sheetData: any;
	}
	withDefaults(defineProps < Props > (), {
		sheetData: () => { return {} }
	}) 
	
	const emit = defineEmits<{
		(e: 'select'): void
	}>()
	
	function selectThis() {
		emit('select')
	}
</script>

<style scoped lang="less">
	.flex_box{
		display: flex;
		justify-content: space-between;
		padding: 30px 10px;
		border-bottom: 1px solid var(--van-cell-border-color);
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
			.title{
				font-size: 28px;
				color: var(--my-text-color-black);
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
			}
		}
		&:active{
			background-color: #e6e6e6;
		}
	}
</style>