<template>
    <div class="video_item" @click="toVideoDetail">
        <div class="left">
            <div class="cover">
                <img :src="videoData.coverUrl + '?param=140y140'" alt="">
            </div>
        </div>
        <div class="center">
            <div class="title text_over_line">{{ videoData.title || videoData.name }}</div>
            <div class="info">
                <span style="margin-right: 5px;">{{ formatMusicTime(videoData.duration) }}</span>
                <span v-if="videoData.creator">{{ videoData.creator.nickname }}</span>
            </div>
        </div>
        <div class="right">{{ dateFormat(playTime, 'yyyy-MM-dd') }}</div>
    </div>
</template>
<script setup lang="ts">
import { recentVideoInterface } from '@/types/public/video'
import { dateFormat, formatMusicTime } from '@/utils'
import { useRouter } from 'vue-router'
import { reqMlogToVideo } from '@/api/video'

const router = useRouter()
interface Props {
    videoData: recentVideoInterface
    playTime: number
    resourceType: string
}
const props = withDefaults(defineProps<Props>(), {
    videoData: () => {
        return {
            coverUrl: '',
            duration: 0,
            id: '',
            title: '',
            name: '',
            creator: {
                userId: 0
            }
        }
    },
    playTime: 0,
    resourceType: ''
})
async function toVideoDetail() {
    let vid = props.videoData.id
    let type = ''
    if (props.resourceType == 'MLOG') {
        const mlog = await reqMlogToVideo({ id: props.videoData.id })
        vid = mlog.data.data
        type = 'MLOG'
    } else if (props.resourceType == 'MV') {
        type = 'MV'
    }
    router.push({
        path: '/videoDetail',
        query: {
            id: vid,
            type: type
        }
    })
}

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