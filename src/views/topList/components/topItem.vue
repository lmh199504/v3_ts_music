<template>
	<div class="top_item" @click="topDetail">
		<div class="topname">{{ topData.name }}</div>
		<div class="coverImg">
			<img :src="topData.coverImgUrl" alt="">
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'
	const router = useRouter()
	interface TopInterface{
		name: string;
		id: number;
		coverImgUrl: string;
	}
	interface Props{
		topData: TopInterface
	}
	const props = withDefaults(defineProps<Props>(), {
		topData: () => { return {
			name: '',
			id: 0,
			coverImgUrl: ''
		} }
	})
	function topDetail() {
		router.push({
			path: '/songSheetDetail',
			query: {
				id: props.topData.id
			}
		})
	}
</script>

<style scoped lang="less">
	.top_item{
		padding: 30px;
		.topname{
			color: var(--my-text-color-black);
			font-size: 40px;
			margin-bottom: 20px;
			font-weight: bold;
		}
		.coverImg{
			height: 300px;
			width: 300px;
			img{
				width: 100%;
				height: 100%;
				border-radius: 20px;
			}
		}
	}
</style>