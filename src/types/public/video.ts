// 视频数据
export interface VideoInterface{
	title: string
	coverUrl: string
	vid: number
	durationms: number
	creator: VideoCreator
	playTime: number
}
interface VideoCreator{
	userId: number
	userName: string
	
}