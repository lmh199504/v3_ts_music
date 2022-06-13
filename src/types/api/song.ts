export interface SongUrlParams{
	id: string | number;
	time?: number | string;
}
// 获取歌单列表
export interface SheetListParams{
	cat?: string;
	before?: number;
	limit?: number
}
// 获取歌曲详情
export interface idsParams{
	ids: string
}
// 心动模式
export interface ModeParams{
	id: number; // 歌曲id
	pid: number; // 歌单id
	sid?: number; // 要开始播放的歌曲id
}