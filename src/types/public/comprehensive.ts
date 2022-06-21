import { arData } from '@/types/store/player'
export interface AlbumInterface{
	name: string;
	picUrl: string
	id: number
	artists: Array<ArtistsInterface>
}
interface ArtistsInterface{
	name: string
	id: number
	picUrl: string
}

export interface SheetInterface{
	name: string;
	coverImgUrl: string
	id: number
}
// 歌词
export interface LyricInterface{
	name: string
	id: number
	lyrics: lyrics
	artists: Array<arData>
}
interface lyrics{
	txt: string
}