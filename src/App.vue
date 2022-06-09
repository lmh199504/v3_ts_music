<template>
	<router-view />
	<BigPlayer />
	<ShareMenu />
</template>
<script setup lang="ts">
	import ShareMenu from '@/components/ShareMenu'
	import BigPlayer from '@/components/BigPlayer'
	import { useSystemStore } from '@/store'
	const systemStore = useSystemStore()
	systemStore.setMode(systemStore.mode)
</script>