<template>
	<div class="daysRecommend">
		<div class=""></div>
	</div>
</template>

<script lang="ts" setup>
import { reqHistoryRecommend } from '@/api/home'
reqHistoryRecommend()
.then(res => {
	console.log(res)
})
</script>

<style>
</style>