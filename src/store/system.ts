import { defineStore } from 'pinia'
import { mode as ModeOptions } from '@/utils/mode'
import { getModeCash, setModeCash } from '@/utils/mode'
import { SongData } from '@/types/store/player'
export enum Mode{
	light = 'light',
	dark = 'dark',
}
export interface modeState {
	mode: Mode;
	showShareMenu: boolean;
	shareSong: SongData;
}
export const useSystemStore = defineStore('system', {  //导出 pinia仓库
	state: (): modeState => ({
		mode: getModeCash() || Mode.light,
		showShareMenu: false,
		shareSong: {
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
		}
	}),
	actions: {
		setMode(mode: Mode) {
			this.mode = mode
			setModeCash(mode)
			for(const key in ModeOptions[mode]) {
				setStyle(key, ModeOptions[mode][key])
			}
		},
		setVisibleMenu(flag: boolean) {
			this.showShareMenu = flag
		},
		setShareSong(song: SongData) {
			this.shareSong = song
		}
	}
})

function setStyle(key: string, value: string) :void {
	document.documentElement.style.setProperty(key, value) 
}