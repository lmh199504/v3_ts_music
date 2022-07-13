import type { UserInterface } from '@/types/public/user'
export interface SheetDataInterface{
    id: number
    creator: UserInterface
}
// 
export interface SheetListFace{
	alg: string;
	canDislike: boolean;
	copywriter: string;
	highQuality: boolean;
	id: number;
	name: string;
	picUrl: string;
	playCount: number;
	trackCount: number;
	trackNumberUpdateTime: number;
	type: number;
}
// 最近播放-歌单
export interface RecentSheet{
	coverImgUrl: string
	name: string
	id: number
	creator: Creator
}
// 
interface Creator{
	userId: number
	nickname: string
}
