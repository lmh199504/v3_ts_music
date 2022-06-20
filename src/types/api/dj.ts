
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