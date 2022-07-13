<template>
	<van-popup v-model:show="showShare" teleport="body" round append-to-body position="bottom">
		<div class="content">
			<van-cell-group>
				<van-cell title="播放" is-link @click="handlePlay">
					<template #right-icon>
						<van-icon name="play-circle-o" />
					</template>
				</van-cell>
				
				<van-cell v-if="isLogin && musicType == MusicType.song" title="添加到" is-link @click="addToSheet">
					<template #right-icon>
						<van-icon name="plus" />
					</template>
				</van-cell>
				<van-cell title="删除" v-if="isLogin && showdel" is-link @click="handleDel">
					<template #right-icon>
						<van-icon name="delete-o" />
					</template>
				</van-cell>
			</van-cell-group>
		</div>
	</van-popup>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia'
	import { useUserStore } from '@/store'
	import { MusicType } from '@/types/store/player'
	import { computed, WritableComputedRef } from 'vue'
	interface Props{
		show: boolean
		showdel: boolean
		musicType: MusicType
	}
	
	const userStore = useUserStore()
	const { isLogin } = storeToRefs(userStore)
	const props = withDefaults(defineProps<Props>(), {
		show: false,
		showdel: false,
		musicType: MusicType.song
	})
	const emit = defineEmits<{
		(e: 'update:show', value: boolean): void,
		(e: 'play'): void,
		(e: 'addToSheet'): void,
		(e: 'del'): void
	}>()
	const showShare: WritableComputedRef<boolean> = computed({
		get() {
			return props.show
		},
		set(val) {
			emit('update:show', val)
		}
	}) 
	function handlePlay() {
		showShare.value = false
		emit('play')
	}
	function addToSheet() {
		emit('addToSheet')
	}
	function handleDel() {
		showShare.value = false
		emit('del')
	}
	
</script>

<style scoped lang="less">
	
</style>
