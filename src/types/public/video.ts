// 搜索视频数据
export interface VideoInterface{
	title: string
	coverUrl: string
	vid: number
	durationms: number
	creator: VideoCreator
	playTime: number
	type: number
}
interface VideoCreator{
	userId: number
	userName?: string
	nickname?: string
}
// 最近播放视频
export interface recentVideoInterface{
	coverUrl: string
	duration: number
	id: string
	title: string
	creator: VideoCreator
	name?: string
}
// mv数据
export interface MvDataInterface{
	cover: string
	id: number
	subed: boolean
	name: string
	artistName: string
	artistId: number
	playCount: number
}