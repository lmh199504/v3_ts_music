// 搜索建议
export interface SuggestParams{
	keywords: string;
	type?: string;
}
// 多重匹配
export interface MultimatchParams{
	keywords: string;
}
// 搜索
export interface TypeSearchparams{
	keywords: string;
	limit?: number;
	type: number
}