// 歌手列表
export interface singerListParams{
	limit?: number;  // 返回数量 , 默认为 30
	offset?: number;
	type?: number;
	area?: number;
	initial?: string;
}
// 关注歌手
export interface subSingerParams{
	id: number;
	t: number; // 1 为收藏,其他为取消收藏
}
// 歌手详情
export interface singerDetailParams{
	id: number;
}
// 分页获取歌曲
export interface singerSongParams{
	id: number;
	order?: string;
	limit: number;
	offset: number;
}
// 获取歌手专辑
export interface singerAlbum{
	id: number;
	limit?: number;
	offset?: number;
}