export interface SongData{
	url: string;
	name: string;
	id: number;
	ar: Array<arData>;
	al: alData;
	dt: number;
	type?: MusicType
}
export enum MusicType {
	song = 1,
	dj = 2
}
export interface alData{
	id: number;
	name: string;
	pic: number;
	picUrl: string;
	pic_str: string;
	// eslint-disable-next-line
	tns?: Array<any>;
}

export interface arData{
	id: number;
	name: string;
}
export enum PlayModeData{
	single = 1, // 单曲
	list = 2, // 列表
	random = 3, // 随机
	loop = 4, // 列表循环
	beckoning = 5, // 心动模式
}