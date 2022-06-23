<template>
    <div class="video_item">
        <div class="left">
            <div class="cover">
                <img :src="videoData.coverUrl + '?param=140y140'" alt="">
            </div>
        </div>
        <div class="center">
            <div class="title text_over_line">{{ videoData.title }}</div>
            <div class="info">
                <span style="margin-right: 5px;">{{ formatMusicTime(videoData.duration) }}</span>
                <span v-if="videoData.creator">{{videoData.creator.nickname}}</span>
            </div>
        </div>
        <div class="right">{{ dateFormat(playTime, 'yyyy-MM-dd') }}</div>
    </div>
</template>
<script setup lang="ts">
import { recentVideoInterface } from '@/types/public/video'
import { dateFormat, formatMusicTime } from '@/utils'
interface Props {
    videoData: recentVideoInterface
    playTime: number
}
withDefaults(defineProps<Props>(), {
    videoData: () => {
        return {
            coverUrl: '',
            duration: 0,
            id: '',
            title: '',
            creator: {
                userId: 0
            }
        }
    },
    playTime: 0
})
</script>
<style scoped lang="less">
.video_item {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    overflow: hidden;

    .left {
        margin-right: 10px;
        flex-shrink: 0;

        .cover {
            width: 200px;
            height: 160px;
            border-radius: 10px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .center {
        flex: 1;
        margin-right: 10px;

        .title {
            font-size: 30px;
            width: 100%;
            max-width: 320px;
            color: var(--my-text-color-black);
        }

        .info {
            margin-top: 10px;
            font-size: 24px;
            color: var(--my-text-color-gray);
        }
    }

    .right {
        font-size: 24px;
        flex-shrink: 0;
        color: var(--my-text-color-gray);
    }
}
</style>