import { defineStore } from 'pinia'
import { SongData, arData, PlayModeData } from '@/types/store/player'
import { reqGetSongUrl } from '@/api/song'
export interface playerState {
	showBigPlayer: boolean;
	currentSong: SongData;
	playList: Array<SongData>; // 播放列表
	playing: boolean;
	currentTime: number;
	currentText: string;
	playMode: PlayModeData;
	// truePlayList: Array<SongData>; // 真实的播放列表
}
export const usePlayerStore = defineStore('player', {  //导出 pinia仓库
	state: (): playerState => ({
		showBigPlayer: false,
		playList: [],
		currentSong: {
			dt: 0,
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
		playing: false,
		currentTime: 0,
		currentText: '',
		playMode: PlayModeData.loop
	}),
	getters: {
		singerName(): string {
			if (this.currentSong.name) {
				return this.currentSong.ar.map((item: arData) => item.name).join('/')
			} else {
				return '歌手名字'
			}
		},
		coverImg(): string {
			if (this.currentSong.name) {
				return this.currentSong.al.picUrl
			} else {
				return require('../assets/images/player/disc_default.png')
			}
		},
		percent(): number {
			if (this.currentSong.dt) {
				return (this.currentTime / this.currentSong.dt) * 100
			} else {
				return 0
			}
		},
		playIndex(): number {
			if (this.currentSong.id && this.playList.length != 0) {
				return this.playList.findIndex((item: SongData) => item.id === this.currentSong.id)
			}
			return -1
		},
		truePlayList(): Array<SongData> {
			return this.playList
		},
		isLast(): boolean {
			if (this.playIndex == this.playList.length - 1) {
				return true
			} else {
				return false
			}
		},
		isFirst(): boolean {
			return this.playIndex == 0
		}
	},
	actions: {
		setPlayerVisible(val: boolean): void {
			this.showBigPlayer = val
		},
		resetList(list: Array<SongData>, romote = true): void {
			const ids = list.map((item: SongData) => { return item.id }).join(',')
			reqGetSongUrl({ id: ids })
				.then(res => {
					const resList = res.data.data
					const result = list.map(item => {
						const find: SongData = resList.find((res_item: SongData) => item.id === res_item.id)
						if (find) {
							if (romote) {
								item.url = find.url
								if (!find.url) {
									item.url = `https://music.163.com/song/media/outer/url?id=${find.id}.mp3`
								}
							} else {
								item.url = `https://music.163.com/song/media/outer/url?id=${find.id}.mp3`
							}
						}
						return item
					})
					this.playList = result
					this.setCurSong(this.playList[0])
				})
		},
		setCurSong(song: SongData, remote = true) {
			if (!song.url) {
				reqGetSongUrl({ id: song.id })
					.then((res) => {
						if (remote) {
							const resList = res.data.data
							song.url = resList[0].url
							if (!resList[0].url) {
								song.url = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
							}
						} else {
							song.url = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
						}
						console.log(song.url)
						this.currentSong = song
						this.playing = true
						const index = this.playList.findIndex((item: SongData): boolean => item.id == song.id)
						if (index == -1) {
							this.playList.push(song)
						}
						// this.setPlayerVisible(true)
					})
			} else {
				this.currentSong = song
				this.playing = true
				const index = this.playList.findIndex((item: SongData): boolean => item.id == song.id)
				if (index == -1) {
					this.playList.push(song)
				}
				// this.setPlayerVisible(true)
			}
		},
		setPlaying(val: boolean): void {
			this.playing = val
		},
		setCurrentTime(time: number): void {
			this.currentTime = time
		},
		setCurrentText(txt: string): void {
			this.currentText = txt
			document.title = txt
		},
		delSong(song: SongData): void {
			const index = this.playList.findIndex((item: SongData):boolean => item.id === song.id )
			if (index != -1) {
				this.playList.splice(index, 1)
			}
		},
		setPlayMode(mode: PlayModeData) {
			this.playMode = mode
		}
	}
})