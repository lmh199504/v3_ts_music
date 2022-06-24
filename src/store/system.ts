import { defineStore } from 'pinia'
import { mode as ModeOptions } from '@/utils/mode'
import { getModeCash, setModeCash } from '@/utils/mode'
export enum Mode{
	light = 'light',
	dark = 'dark'
}
export interface modeState {
	mode: Mode;
}
export const useSystemStore = defineStore('system', {  //导出 pinia仓库
	state: (): modeState => ({
		mode: getModeCash() || Mode.light,
	}),
	actions: {
		setMode(mode: Mode) {
			this.mode = mode
			setModeCash(mode)
			for(const key in ModeOptions[mode]) {
				setStyle(key, ModeOptions[mode][key])
			}
		}
	}
})

function setStyle(key: string, value: string) :void {
	document.documentElement.style.setProperty(key, value) 
}