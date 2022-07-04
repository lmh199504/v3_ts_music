<template>
	<div>关注</div>
</template>

<script setup lang="ts">
import { reqEvent } from '@/api/event'
reqEvent({
	pagesize: 20,
	lasttime: -1
})
</script>

<style>
</style>