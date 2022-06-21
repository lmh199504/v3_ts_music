// 歌手信息
export interface singerInterface{
	name: string;
	picUrl: string;
	id: number;
	followed: boolean; // 是否已经关注了
	accountId: number
}
// 歌手专辑
export interface singerAlbumInterface{
	name: string;
	picUrl: string;
	artist: any;
	id: number
}