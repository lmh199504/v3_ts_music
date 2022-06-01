<template>
	<van-popup v-model:show="show" round append-to-body>
		<List v-if="show"/>
	</van-popup>
</template>

<script lang="ts" setup>
	import {
		computed
	} from 'vue'
	import List from './index.vue'
	interface Props {
		showPopup: boolean;
	}
	const props = withDefaults(defineProps < Props > (), {
		showPopup: false
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
</script>

<style>
</style>
