export interface SongUrlParams{
	id: string | number;
}
// 获取歌单列表
export interface SheetListParams{
	cat?: string;
	before?: number;
	limit?: number
}