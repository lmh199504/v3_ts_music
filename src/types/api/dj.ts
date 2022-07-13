
// 电台个性推荐
export interface RecommendParams{
	limit?: number
}
// 电台 - 分类推荐
export interface RecommendTypeParams{
	type: number
}
// 电台 - 类别热门电台
export interface DjHotByTypeParams{
	limit?: number
	offset?: number
	cateId: number
}
// 电台 - 新晋电台榜/热门电台榜
export interface TopListParams{
	limit?: number
	offset?: number
	type?: string 
}
// 热门主播
export interface TopPopularParams{
	limit?: number
}
// 电台详情
export interface DjDetailParams{
	rid: number
}
// 电台节目
export interface DjprogramParams{
	rid: number
	limit: number
	offset: number
	asc?: boolean
}
// 电台订阅
export interface DjSubParams{
	rid: number
	t: number
}