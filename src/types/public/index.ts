import { arData, alData } from '@/types/store/player'

// 歌单数据
export interface songListFace{
	alg: string;
	canDislike: boolean;
	copywriter: string;
	highQuality: false;
	id: number;
	name: string;
	picUrl: string;
	playCount: number;
	trackCount: number;
	trackNumberUpdateTime: number;
	type: number;
}
// 推荐歌曲数据类型
export interface songData{
	alg: string
	canDislike: boolean
	copywriter: string
	id: number
	name: string
	picUrl: string
	// eslint-disable-next-line
	song: any
	trackNumberUpdateTime: number | null
	type: number
}
// 歌单广场歌单
export interface SheetDataFace{
	coverImgUrl: string;
	tags: Array<string>;
	updateTime: number;
	name: string;
	playCount: number;
}

// 歌单广场列表歌曲
export interface songInterface{
	id: number;
	name: string;
	artists: Array<arData>;
	album: alData;
	duration: number;
}
