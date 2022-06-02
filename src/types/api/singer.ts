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