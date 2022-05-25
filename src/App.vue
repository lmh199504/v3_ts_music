<template>
	<router-view />
	<BigPlayer />
</template>
<script setup lang="ts">
	import BigPlayer from '@/components/BigPlayer'
	import { useSystemStore } from '@/store'
	const systemStore = useSystemStore()
	systemStore.setMode(systemStore.mode)
</script>