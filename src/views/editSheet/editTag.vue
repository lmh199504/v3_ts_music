<template>
	<MiniPlayOut>
		<div class="create_sheet">
			<van-nav-bar title="编辑名称" left-arrow fixed placeholder @click-left="onClickLeft" right-text="保存" @click-right="handleSave" />
			
			<div v-for="(item, index) in parentList" :key="index">
				<van-row>
					<van-col :span="6">
						{{ item }}
					</van-col>
				</van-row>
			</div>
			
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import { Toast } from 'vant'
	import { onClickLeft } from '@/utils/back'
	import { useRoute, useRouter } from 'vue-router'
	import { ref } from 'vue'
	import { reqUpdateSheetName, reqCatList } from '@/api/sheet' 
	const name = ref<string>('')
	const route = useRoute()
	const { id } = route.query
	const parentList = ref([])
	const childList = ref([])
	const router = useRouter()
	function handleSave() {
		if (!name.value) {
			Toast.fail('请输入歌单名称')
			return
		}
		const params = {
			id: id,
			name: name.value
		}
		const loading = Toast.loading({
			duration: 0,
			message: '加载中...',
			overlay: true
		})
		reqUpdateSheetName(params)
		.then(() => {
			router.back()
		})
		.finally(() => {
			loading.clear()
		})
	}
	// 歌曲标签
	function getCatList() {
		reqCatList()
		.then(res => {
			console.log(res)
			parentList.value = res.data.categories
			childList.value = res.data.sub
		})
	}
	getCatList()
	
</script>

<style scoped lang="less">
	.create_sheet{
		height: 100%;
		overflow: auto;
		padding: 15px;
		box-sizing: border-box;
		.over_img{
			width: 200px;
			height: 200px;
		}
		.photograph{
			height: 200px;
			width: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--my-back-color-gray);
		}
	}
</style>