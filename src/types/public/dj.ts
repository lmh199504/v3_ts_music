
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
	feeScope?: number
}
// 分类数据
export interface CategoryInterface{
	id: number
	name: string
	pic56x56Url: string
}