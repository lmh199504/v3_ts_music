
// 电台推荐分类
export interface DjCategoryRecommend{
	categoryId: number
	categoryName: string
	radios: Array<DjData>
}
// 推荐电台数据
export interface DjData{
	id: number
	rcmdText: string
	subed: false
	programCount: number
	picUrl: string
	name: string
	playCount: number
}