<template>
	<van-popup v-model:show="show" round append-to-body position="bottom">
		<div class="content">
			<van-cell-group>
				<van-cell title="删除" is-link @click="handleDel">
					<template #right-icon>
						<van-icon name="delete-o" />
					</template>
				</van-cell>
				<van-cell title="编辑" v-if="!hideEdit" is-link @click="handleEdit">
					<template #right-icon>
						<van-icon name="edit" />
					</template>
				</van-cell>
			</van-cell-group>
		</div>
	</van-popup>
</template>

<script lang="ts" setup>
	import {
		computed,
	} from 'vue'
	interface Props {
		showPopup: boolean;
		hideEdit: boolean;
	}
	const props = withDefaults(defineProps < Props > (), {
		showPopup: false,
		hideEdit: false
	})
	const emit = defineEmits < {
		(e: 'update:show-popup', value: boolean): void,
		(e: 'del'): void,
		(e: 'edit'): void
	} > ()
	const show = computed({
		get() {
			return props.showPopup
		},
		set(val) {
			emit('update:show-popup', val)
		}
	})
	
	function handleDel() {
		emit('del')
	}
	
	function handleEdit() {
		emit('edit')
	}
</script>

<style scoped lang="less">
	.content {
		padding: 30px;

		.menu {
			display: flex;
			justify-content: space-between;
			font-size: 28px;
			padding: 16px 32px;

			.cancel {
				color: var(--my-text-color-gray);
			}

			.finish {
				color: var(--my-text-color-black);
			}
		}
	}
</style>
