<template>
	<van-popup v-model:show="show" round append-to-body position="bottom">
		<div class="content">
			<div class="menu">
				<div class="cancel" @click="show = false">取消</div>
				<div class="finish" @click="createSheet">完成</div>
			</div>
			<van-form >
				<van-cell-group>
					<van-field label="标题" placeholder="请输入歌单标题" v-model="formData.title" required />
					<van-field label="公开">
						<template #input>
							<van-radio-group v-model="formData.public" direction="horizontal">
								<van-radio :name="true" checked-color="#e20001">是</van-radio>
								<van-radio :name="false" checked-color="#e20001">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>
				</van-cell-group>
			</van-form>
		</div>
	</van-popup>
</template>

<script lang="ts" setup>
	import { Toast } from 'vant'
	import { reqCreateSheet } from '@/api/sheet'
	import {
		computed, reactive
	} from 'vue'
	interface Props {
		showPopup: boolean;
	}
	const props = withDefaults(defineProps < Props > (), {
		showPopup: false
	})
	
	const formData = reactive({
		public: true,
		title: ''
	})
	
	const emit = defineEmits < {
		(e: 'update:show-popup', value: boolean): void,
		(e: 'success'): void
	} > ()
	const show = computed({
		get() {
			return props.showPopup
		},
		set(val) {
			emit('update:show-popup', val)
		}
	})
	
	function createSheet() {
		
		if (!formData.title) {
			Toast.fail('请输入标题')
			return
		}
		const loading = Toast.loading({
			duration: 0,
			message: '创建中...',
			overlay: true
		})
		const params = {
			name: formData.title,
			privacy: formData.public ? undefined : '10'
		}
		reqCreateSheet(params)
		.then(() => {
			show.value = false
			emit('success')
		})
		.finally(() => {
			loading.clear()
		})
	}
	
</script>

<style scoped lang="less">
	.content{
		padding: 30px;
		.menu{
			display: flex;
			justify-content: space-between;
			font-size: 28px;
			padding: 16px 32px;
			.cancel{
				color: var(--my-text-color-gray);
			}
			.finish{
				color: var(--my-text-color-black);
			}
		}
	}
</style>
