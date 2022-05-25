import { defineStore } from 'pinia'
import { SongData, arData } from '@/types/store/player'
import { reqGetSongUrl } from '@/api/song'
export interface playerState{
	showBigPlayer: boolean;
	currentSong: SongData;
	playList: Array<SongData>;
	playing: boolean
}
export const usePlayerStore = defineStore('player', {  //导出 pinia仓库
	state: (): playerState => ({
		showBigPlayer: false,
		playList: [],
		currentSong: {
			url: '',
			name: '',
			id: 0,
			ar: [],
			al: {
				id: 0,
				name: '',
				pic: 0,
				picUrl: '',
				pic_str: '',
				tns: []
			}
		},
		playing: false
	}),
	getters: {
		singerName() :string {
			if (this.currentSong.name) {
				return this.currentSong.ar.map((item: arData) => item.name).join('/')
			} else {
				return '歌手名字'
			}
		},
		coverImg() :string {
			if (this.currentSong.name) {
				return this.currentSong.al.picUrl
			} else {
				return require('../assets/images/player/disc_default.png')
			}
		}
	},
	actions: {
		setPlayerVisible(val: boolean) :void {
			this.showBigPlayer = val
		},
		resetList(list: Array<SongData>) :void {
			const ids = list.map((item: SongData) => { return item.id }).join(',')
			reqGetSongUrl({ id: ids })
			.then(res => {
				const resList = res.data.data
				const result = list.map(item => {
					const find: SongData = resList.find((res_item: SongData) => item.id === res_item.id)
					if (find) {
						item.url = find.url
					}
					return item
				})
				this.playList = result
				this.setCurSong(this.playList[0])
			})
		},
		setCurSong(song: SongData) {
			if (!song.url) {
				reqGetSongUrl({ id: song.id })
				.then(res => {
					const resList = res.data.data
					song.url = resList[0].url
					this.currentSong = song
					this.playing = true
					this.setPlayerVisible(true)
				})
			} else {
				this.currentSong = song
				this.playing = true
				this.setPlayerVisible(true)
			}
		},
		setPlaying(val: boolean): void {
			this.playing = val
		}
	}
})