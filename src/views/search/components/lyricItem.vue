<template>
	<div class="lyric_item">
		<div :class="{'inner': hide}">
			<div class="songname" v-html="songname"></div>
			<div class="singer" v-html="singer"></div>
			<div class="" v-for="(item, index) in lines" :key="index" v-html="item"></div>
		</div>
		<div class="more_btn" @click="toggle">
			<template v-if="hide">
				<div>展开歌词</div>
				<div>
					<van-icon name="arrow-down" />
				</div>
			</template>
			<template v-else>
				<div>收起歌词</div>
				<div>
					<van-icon name="arrow-up" />
				</div>
			</template>
		</div>
		<div class="play">
			<van-icon name="play-circle-o" @click="play" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { LyricInterface } from '@/types/public/comprehensive'
	import { reqSongDetail } from '@/api/song'
	import { usePlayerStore } from '@/store'
	
	const playerStore = usePlayerStore()
	interface Props{
		lyricData: LyricInterface
		keyword: string
	}
	const props = withDefaults(defineProps<Props>(),{
		lyricData: () => {
			return {
			name: '',
			id: 0,
			lyrics: {
				txt: ''
			},
			artists: []
		}
		},
		keyword: ''
	})
	const hide = ref<boolean>(true)
	const singer = computed(() => {
		return props.lyricData.artists.map(item => item.name).join('/').replace(props.keyword, `<span class="key_span">${props.keyword}</span>`)
	})
	
	const lines = computed(() => {
		return props.lyricData.lyrics.txt.split('\n').map(item => item.replace(props.keyword, `<span class="key_span">${props.keyword}</span>`))
	})
	const songname = computed(() => {
		return props.lyricData.name.split('\n').map(item => item.replace(props.keyword, `<span class="key_span">${props.keyword}</span>`))
	})
	
	function toggle() {
		hide.value = !hide.value
	}
	function play() {
		reqSongDetail({
			ids: props.lyricData.id + ''
		})
		.then(res => {
			if (res.data.songs.length) {
				playerStore.setCurSong(res.data.songs[0])
			}
		})
	}
	
</script>

<style scoped lang="less">
	.lyric_item{
		border-bottom: 1px solid var(--van-cell-border-color);
		padding: 10px 0;
		font-size: 24px;
		line-height: 50px;
		color: var(--my-text-color-gray);
		position: relative;
		.inner{
			display: -webkit-box;
			overflow: hidden;
			// text-overflow: ellipsis;
			-webkit-line-clamp: 6;
			-webkit-box-orient: vertical;
		}
		.more_btn{
			display: flex;
			align-items: center;
			color: var(--van-gray-8);
		}
		.play{
			position: absolute;
			top: 10px;
			right: 30px;
			font-size: 30px;
		}
		:deep(.key_span){
			color: rgba(59, 134, 232, 0.8);
		}
	}
</style>