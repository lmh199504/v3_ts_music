<template>
	<div class="dj_item">
		<div>dfgdsgfdg</div>
	</div>
</template>

<script setup lang="ts">
	import type {
		DjData
	} from '@/types/public/dj'
	interface Props {
		djData: DjData
	}
	withDefaults(defineProps < Props > (), {
		djData: () => {
			return {
				id: 0,
				rcmdText: '',
				subed: false,
				programCount: 0,
				picUrl: '',
				name: '',
				playCount: 0
			}
		}
	})
</script>

<style>
</style>
