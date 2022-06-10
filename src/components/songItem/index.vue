<template>
	<div class="song-item">
		<div class="left">
			<img class="left_al_img" :src="songData.al.picUrl + '?param=140y140'" alt="" v-lazy="songData.al.picUrl + '?param=140y140'">
		</div>
		<div class="center">
			<div class="song-name">{{ songData.name }}</div>
			<div class="singer">{{ singer }}</div>
		</div>
		<div class="right">
			<i class="iconfont icon-24gf-play" @click="playThis"></i>
			<i class="iconfont icon-Androidgengduo" @click="showShareMenu"></i>
		</div>
	</div>
	
	<SongMenu v-if="show" :song-data="songData" :showdel="showdel" v-model:show="show" @play="playThis" @addToSheet="addToSheet" @del="del" />
	<MySheetList v-if="showSheet" v-model:show="showSheet" @select="selectSheet" />
	
</template>

<script setup lang="ts">
	import MySheetList from '@/components/mySheetList'
	import SongMenu from './songMenu.vue'
	import { computed, toRaw, ref } from 'vue'
	import { usePlayerStore } from '@/store'
	import { reqSheetTracks } from '@/api/sheet'
	import { Toast } from 'vant'
	
	
	const playerStore = usePlayerStore()
	interface Props{
		// eslint-disable-next-line
		songData: any;
		showdel: boolean;
	}

	const props = withDefaults(defineProps < Props > (), {
		songData: () => { return {} },
		showdel: false
	}) 
	const singer = computed(() => {
		if (props.songData?.ar) {
			return props.songData.ar.map(item => item.name).join('/')
		}
		return ''
	})
	const show = ref<boolean>(false)
	const showSheet = ref<boolean>(false)
	
	const emit = defineEmits<{
		(e: 'del'): void
	}>()
	
	function showShareMenu() {
		show.value = true
	}
	function playThis() {
		playerStore.setCurSong(toRaw(props.songData))
	}
	function addToSheet() {
		show.value = false
		showSheet.value = true
	}
	// 添加歌曲到歌单
	function selectSheet(item) {
		const loading = Toast.loading({
			duration: 0,
			message: '加载中...',
			overlay: true
		})
		const params = {
			op: 'add', // 从歌单增加单曲为 add, 删除为 del
			pid: item.id,  // 歌单 id
			tracks: props.songData.id //  tracks: 歌曲 id,可多个,用逗号隔开 
		}
		reqSheetTracks(params)
		.then(() => {
			showSheet.value = false
			Toast.success('添加成功')
		})
		.finally(() => {
			loading.clear()
		})
	}
	// 删除歌曲
	function del() {
		emit('del')
	}
	
	
</script>

<style scoped lang="less">
	.song-item{
		display: flex;
		.left{
			margin-right: 10px;
			.left_al_img{
				width: 80px;
				height: 80px;
				border-radius: 20px;
				padding: 10px;
			}
		}
		.center{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			.song-name{
				font-size: 26px;
				color: var(--my-text-color-black);
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 450px;
				white-space: nowrap;
			}
			.singer{
				color: var(--my-text-color-gray);
				font-size: 24px;
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 450px;
				white-space: nowrap;
			}
		}
		.right{
			.iconfont{
				color: var(--my-text-color-gray);
				padding-left: 20px;
				font-size: 28px;
			}
		}
	}
</style>