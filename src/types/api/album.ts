
export interface AlbumListParams{
	limit?: number
}
// 数字专辑
export interface DigitAlbumParams{
	limit?: number;
	offset?: number;
	albumType?: number;
	type: string;
}