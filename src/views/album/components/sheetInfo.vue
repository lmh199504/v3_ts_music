<template>
	<van-popup v-model:show="show" style="width: 100%;height: 100vh;" closeable @close="close" class="mypop">
		<div class="content">
			<div class="bg">
				<img :src="info.picUrl" alt="">
			</div>
			<div class="mask"></div>
			<div class="main">
				<div class="cover_img">
					<img :src="info.picUrl" alt="">
				</div>
				<div class="sheetName">{{ info.name }}</div>
				<div class="tag_wrapper">
					<div>标签：</div>
					<div class="tags" v-for="(item, index) in info.tags" :key="index">{{ item }}</div>
				</div>
				
				<div class="description">
					{{ info.description }}
				</div>
			</div>
		</div>
	</van-popup>
</template>

<script lang="ts" setup>
	import {
		computed
	} from 'vue'
	interface Info{
		tags: Array<string>
		picUrl: string
		name: string
		description: string
	}
	interface Props {
		showPopup: boolean;
		info: Info;
	}
	const props = withDefaults(defineProps < Props > (), {
		showPopup: false,
		info: () => { return {
			tags: [],
			picUrl: '',
			name: '',
			description: ''
		} }
	})
	const emit = defineEmits < {
		(e: 'update:show-popup', value: boolean): void
	} > ()
	const show = computed({
		get() {
			return props.showPopup
		},
		set(val) {
			emit('update:show-popup', val)
		}
	})
	
	function close() {
		console.log('关闭')
	}
</script>

<style scoped lang="less">
	:deep(.mypop){
		.van-popup__close-icon--top-right{
			z-index: 8!important;
		}
	}
	.content{
		width: 100%;
		height: 100%;
		position: relative;
		.bg{
			position: absolute;
			z-index: -2;
			width: 100%;
			height: 100%;
			filter: blur(300px);
			img{
				width: 100%;
				height: 100%;
			}
		}
		.mask{
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 100%;
			background-color: var(--my-mask-color);
		}
		.main{
			position: relative;
			padding: 60px;
			box-sizing: border-box;
			background: transparent;
			z-index: 0;
			height: 100%;
			overflow-y: scroll;
			.cover_img{
				padding-top: 100px;
				text-align: center;
				img{
					width: 240px;
					height: 240px;
					border-radius: 10px;
				}
			}
			.sheetName{
				margin-top: 20px;
				color: rgba(255, 255, 255, 0.8);
				font-size: 30px;
				text-align: center;
			}
			.tag_wrapper{
				margin-top: 50px;
				display: flex;
				flex-wrap: wrap;
				font-size: 28px;
				color: rgba(255, 255, 255, 0.8);
				line-height: 50px;
				.tags{
					margin-left: 20px;
					height: 50px;
					background-color: #343331;
					padding: 0 20px;
					line-height: 50px;
					border-radius: 25px;
				}
			}
			.description{
				font-size: 24px;
				color: rgba(255, 255, 255, 0.8);
				margin-top: 50px;
				line-height: 50px;
				text-align: justify;
			}
		}
	}
</style>
