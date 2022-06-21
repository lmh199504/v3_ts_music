<template>
	<MiniPlayOut>
		<div class="create_sheet">
			<van-nav-bar title="编辑名称" left-arrow fixed placeholder @click-left="onClickLeft" right-text="保存" @click-right="handleSave" />
			<van-form input-align="right">
				<van-cell-group>
					<van-field label="名称" v-model="name" placeholder="请输入歌单名称" maxlength="50"></van-field>
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
	import { reqUpdateSheetName } from '@/api/sheet' 
	const name = ref<string>('')
	const route = useRoute()
	const { id } = route.query
	const router = useRouter()
	function handleSave() {
		if (!name.value) {
			Toast.fail('请输入歌单名称')
			return
		}
		const params = {
			id: Number(id),
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