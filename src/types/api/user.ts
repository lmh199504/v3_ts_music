// 发送验证码
export interface SendCodeParams{
	phone?: number;
}
// 验证码登录
export interface PhoneLoginParams{
	phone: number | string;
	captcha?: number;
	password?: string;
}
// 邮箱登录
export interface EmaiLoginParams{
	email: string;
	password: string;
}
// 用户歌单
export interface UserPlayList{
	uid: number;
	limit?: number;
	offset?: number;
}
// 用户关注/粉丝列表
export interface UserFollow{
	uid: number;
	limit?: number;
	offset?: number;
}
//  uid 
export interface UidParams{
	uid: number
	timestamp?: number
}
// 喜欢音乐
export interface LikeParams{
	id: number; // 歌曲id
	like?: boolean; // 默认为 true 即喜欢 , 若传 false, 则取消喜欢
}
// 云盘音乐
export interface CloudDiskParams{
	limit: number
	offset: number
	timestamp?: number
}
// 上传云盘音乐
export interface UpCloudMusicParams{
	songFile: File
}
// 删除云盘歌曲
export interface DelCloudMusicParams{
	id: number | string
}
// 取消关注用户
export interface FollowParams{
	id: number //用户 id
	t: number //1为关注,其他为取消关注
}