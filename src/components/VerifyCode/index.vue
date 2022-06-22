<template>
	<div class="code_wrapper">
		<div class="split_code">
			<ul>
				<li v-for="(item, index) in len" :key="index">{{ splitNum[index] ? splitNum[index] : '' }}</li>
			</ul>
		</div>
		<van-field class="input" v-model="codeVal" type="number" autofocus :maxlength="len" placeholder="验证码" />
		<!-- <input class="input" v-model="codeVal" @input="codeInput" type="number" :maxlength="len" > -->
	</div>
</template>

<script setup lang="ts">
	import { computed, WritableComputedRef, ComputedRef } from 'vue'
	interface Props {
		code: number | string | undefined;
		len: number;
	}
	const emit = defineEmits(['update:code'])
	const props = withDefaults(defineProps < Props > (), {
		code: '',
		len: 4
	})
	
	const codeVal: WritableComputedRef<string|number> = computed({
		get() {
			return props.code
		},
		set(val) {
			emit('update:code', val)
		}
	})
	const splitNum: ComputedRef<Array<string>> = computed(() => {
		return (codeVal.value + '').split('')
	})
</script>

<style scoped lang="less">
	.code_wrapper{
		position: relative;
		.input{
			left: 0;
			top: 0;
			position: absolute;
			opacity: 0;
			z-index: 1;
			width: 100%;
			height: 100%;
			:deep(.van-field__body){
				height: 100%;
				.van-field__control{
					height: 100%;
				}
			}
		}
		.split_code{
			padding: 30px;
			ul{
				display: flex;
				justify-content: space-between;
				li{
					width: 100px;
					height: 100px;
					border-bottom: 1px solid #e0e0e0;
					text-align: center;
					color: var(--my-text-color-black);
				}
			}
		}
	}
</style>