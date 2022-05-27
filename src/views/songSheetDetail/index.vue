<template>
	<MiniPlayOut>
		<Scroll>
			<van-nav-bar left-arrow>
				<template #title>
					<van-notice-bar scrollable text="sdfasdfdasfs" />
				</template>
			</van-nav-bar>
		</Scroll>	
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import MiniPlayOut from '@/layout/miniplayout'
	import Scroll from '@/components/Scroll'
	import { reqSheetDetail } from '@/api/song'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	function getDetail() {
		reqSheetDetail({ id: route.query.id })
		.then(res => {
			console.log(res)
		})
	}
	getDetail()
</script>

<style scoped lang="less">
	.songSheetDetail{
		
	}
</style>