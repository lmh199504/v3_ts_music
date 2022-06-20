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
	highQuality: false;
	id: number;
	name: string;
	picUrl: string;
	playCount: number;
	trackCount: number;
	trackNumberUpdateTime: number;
	type: number;
}