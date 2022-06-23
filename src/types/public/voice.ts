import { songInterface } from '@/types/public'
// 最近播放-声音
export interface RecentVoiceInterface{
    commentCount: number
    pubDJProgramData: RecentViiceData
}
export interface RecentViiceData{
    coverUrl: string
    id: number
    name: string
    programDesc: null | string
    duration: number
    adjustedPlayCount: number
    mainSong: songInterface
}