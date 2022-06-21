
export interface subscribeParams{
	t: number;   // t : 类型,1:收藏,2:取消收藏 id : 歌单 id
	id: number;
}
// 创建歌单
export interface createParams{
	name: string;
	type?: string;
	privacy?: string | undefined
}
// 删除歌单
export interface delParams{
	id: string | number
}
// 添加删除歌曲到歌单
export interface SheetTracksParams{
	op: string; // 从歌单增加单曲为 add, 删除为 del
	pid: number;  // 歌单 id
	tracks: number |string; //  tracks: 歌曲 id,可多个,用逗号隔开 
}
// 更新歌单封面
export interface UpdateCoverParams{
	id: number;
	imgSize?: number; // 图片尺寸,默认为 300
	imgX?: number; // 水平裁剪偏移,方形图片可不传,默认为 0 
	imgY?: number; // 垂直裁剪偏移,方形图片可不传,默认为 0
}
// 更新名称
export interface UpdateNameParams{
	id: number;
	name: string;
}
// 更新标签
export interface UpdateTagsParams{
	id: number;
	tags: string;
}
// 更新描述
export interface UpdateDescParams{
	id: number;
	desc: string
}