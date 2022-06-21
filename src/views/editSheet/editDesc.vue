<template>
	<MiniPlayOut>
		<div class="create_sheet">
			<van-nav-bar title="编辑描述" left-arrow fixed placeholder @click-left="onClickLeft" right-text="保存" @click-right="handleSave" />
			<van-form input-align="right">
				<van-cell-group>
					<van-field label="描述" :autosize="{ maxHeight: 600, minHeight: 300 }" v-model="desc" type="textarea" placeholder="请输入歌单描述" maxlength="2000" show-word-limit :row="10"></van-field>
				</van-cell-group>
			</van-form>
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import { Toast } from 'vant'
	import { onClickLeft } from '@/utils/back'
	import { useRoute, useRouter } from 'vue-router'
	import { ref } from 'vue'
	import { reqUpdateSheetDesc } from '@/api/sheet' 
	import { reqSheetDetail } from '@/api/song'
	const desc = ref<string>('')
	const route = useRoute()
	const { id } = route.query
	const router = useRouter()
	function handleSave() {
		if (!desc.value) {
			Toast.fail('请输入歌单描述')
			return
		}
		const params = {
			id: Number(id),
			desc: desc.value
		}
		const loading = Toast.loading({
			duration: 0,
			message: '加载中...',
			overlay: true
		})
		reqUpdateSheetDesc(params)
		.then(() => {
			router.back()
		})
		.finally(() => {
			loading.clear()
		})
	}
	//  获取描述
	function getDetail() {
		reqSheetDetail({ id: Number(id), timestamp: Date.now() })
		.then(res => {
			desc.value = res.data.playlist.description
		})
	}
	getDetail()
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