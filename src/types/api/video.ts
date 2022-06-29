
// 视频播放地址
export interface VideoUrlParams{
	id: number
}
// 视频详情
export interface VideoDetailParams{
	id: string | number
}
// 所有视频
export interface AllVideoParams{
	offset?: number
	timestamp?: number
}
// 获取 mlog 播放地址
export interface MlogUrlParams{
	id: string | number
}
// 将 mlog id 转为视频 id
export interface MlogToVideParams{
	id: string|number
}
// mv详情
export interface MvDetailParams{
	mvid: string|number
}
// mv播放地址
export interface MvUrlParams{
	id: string|number
}
// 最新mv
export interface NewMvParams{
	area?: string
	limit?: number 
}
// mv排行
export interface MvTopParams{
	area?: string
	limit?: number
	offset?: number
}