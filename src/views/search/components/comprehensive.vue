<template>
	<div>
		<div class="flex_box_center_column" v-if="loading">
			<van-loading />
		</div>
		<!-- 单曲 -->
		<div class="box_white_container">
			<div class="box_top">
				<div class="title">单曲</div>
				<div class="flex_box_center_column">
					<van-button icon="play" round size="mini" @click="playAll">播放</van-button>
				</div>
			</div>
			<div>
				<SongItem v-for="item in songData.songs" :key="item.id" :song-data="item" :showdel="false" />
			</div>
			<div v-if="songData.moreText" class="more_text" @click="switchActive(1)">
				<div>{{ songData.moreText }}</div>
				<div class="flex_box_center_column">
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
		<!-- 歌手 -->
		<div class="box_white_container" v-if="singerData.artists.length!=0">
			<div class="box_top">
				<div class="title">歌手</div>
			</div>
			<div>
				<SingerItem v-for="item in singerData.artists" :key="item.id" :singer-data="item" />
			</div>
			<div class="more_text" @click="switchActive(2)" v-if="singerData.moreText">
				<div>{{ singerData.moreText }}</div>
				<div class="flex_box_center_column">
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
		<!-- 专辑 -->
		<div class="box_white_container" v-if="albumData.albums.length !=0">
			<div class="box_top">
				<div class="title">专辑</div>
			</div>
			<div>
				<AlbumItem v-for="item in albumData.albums" :key="item.id" :album-data="item" />
			</div>
			<div v-if="albumData.moreText" class="more_text" @click="switchActive(3)">
				<div>{{ albumData.moreText }}</div>
				<div class="flex_box_center_column">
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
		<!-- 歌单 -->
		<div class="box_white_container" v-if="sheetData.playLists.length !=0">
			<div class="box_top">
				<div class="title">歌单</div>
			</div>
			<div>
				<SheetItem v-for="item in sheetData.playLists" :key="item.id" :sheet-data="item" :hide-edit="true" :show-edit="false" />
			</div>
			<div v-if="sheetData.moreText" class="more_text" @click="switchActive(4)">
				<div>{{ sheetData.moreText }}</div>
				<div class="flex_box_center_column">
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
		<!-- 用户 -->
		<div class="box_white_container" v-if="userData.users.length !=0">
			<div class="box_top">
				<div class="title">用户</div>
			</div>
			<div>
				<UserItem v-for="item in userData.users" :key="item.userId" :user-data="item" />
			</div>
			<div v-if="userData.moreText" class="more_text" @click="switchActive(5)">
				<div>{{ userData.moreText }}</div>
				<div class="flex_box_center_column">
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive, ref, toRaw } from 'vue'
	import { reqSearchByType } from '@/api/search'
	import type { SongData } from '@/types/store/player'
	import { singerInterface } from '@/types/public/singer'
	import SongItem from '@/components/songItem/index.vue'
	import SingerItem from '@/views/singer/components/singerItem.vue'
	import { AlbumInterface, SheetInterface } from '@/types/public/comprehensive'
	import AlbumItem from './albumItem.vue'
	import SheetItem from '@/views/mine/components/sheetItem.vue'
	import { UserInterface } from '@/types/public/user'
	import UserItem from '@/components/UserItem/index.vue'
	import { usePlayerStore } from '@/store'
	interface Props{
		keyword: string;
		type: number
	}
	const playerStore = usePlayerStore()
	const loading = ref<boolean>(false)
	const props = withDefaults(defineProps<Props>(), {
		keyword: ''
	})
	// 歌曲
	interface ResultSong{
		songs: Array<SongData>
		moreText: string
	}
	const songData: ResultSong = reactive({
		moreText: '',
		songs: []
	})
	// 歌手
	interface ResultSinger{
		artists: Array<singerInterface>;
		moreText: string;
	}
	const singerData: ResultSinger = reactive({
		artists: [],
		moreText: ''
	})
	// 专辑
	interface ResultAlbum{
		moreText: string
		albums: Array<AlbumInterface>
	}
	const albumData = reactive<ResultAlbum>({
		moreText: '',
		albums: []
	})
	// 歌单
	interface ResultSheet{
		playLists: Array<SheetInterface>
		moreText: string
	}
	const sheetData: ResultSheet = reactive({
		playLists: [],
		moreText: ''
	})
	// 用户
	interface ResultUser{
		users: Array<UserInterface>
		moreText: string
	}
	const userData: ResultUser = reactive({
		users: [],
		moreText: ''
	})
	const emit = defineEmits<{
		(e: 'switchActive', value: number): void
	}>()
	function getData() {
		loading.value = true
		reqSearchByType({ keywords: props.keyword, type: props.type })
		.then(res => {
			const result = res.data.result
			// 歌曲
			songData.moreText = result.song.moreText
			songData.songs = result.song.songs.filter((item :SongData, index: number) => index < 5)
			// 歌手
			singerData.artists = result.artist?.artists || []
			singerData.moreText = result.artist?.moreText || ''
			// 专辑
			albumData.moreText = result.album?.moreText || ''
			albumData.albums = result.album?.albums || []
			// 歌单
			sheetData.moreText = result.playList?.moreText || ''
			sheetData.playLists = result.playList?.playLists || []
			// 用户
			userData.users = result.user?.users || []
			userData.moreText = result.user?.moreText || ''
		})
		.finally(() => {
			loading.value = false
		})
	}
	// 查看更多歌曲
	function switchActive(number: number) {
		emit('switchActive', number)
	}
	getData()

	function playAll() {
		playerStore.resetList(toRaw(songData.songs))
	}
</script>

<style scoped lang="less">
	.box_top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--van-gray-3);
		padding-bottom: 20px;
		.title{
			font-size: 30px;
			color: var(--my-text-color-black);
			font-weight: bold;
		}
	}
	.more_text{
		display: flex;
		justify-content: center;
		font-size: 24px;
		align-items: center;
		padding: 20px 0 10px 0;
		border-top: 1px solid var(--van-gray-3);
		color: var(--my-text-color-gray);
	}
</style>