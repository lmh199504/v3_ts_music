<template>
	<router-view />
	<BigPlayer />
</template>
<script setup lang="ts">
	import BigPlayer from '@/components/BigPlayer/index.vue'
	import { useSystemStore } from '@/store'
	const systemStore = useSystemStore()
	systemStore.setMode(systemStore.mode)
</script>