<template>
    <div class="voiceItem">
        <div class="left">
            <div class="cover">
                <img :src="videoData.pubDJProgramData.coverUrl" alt="">
            </div>
        </div>
        <div class="center">
            <div class="name">{{ videoData.pubDJProgramData.name }}</div>
            <div class="info">
                <div class="info_item">
                    <i class="iconfont icon-24gf-play"></i>
                    {{ formatCountNumber(videoData.pubDJProgramData.adjustedPlayCount) }}</div>
                <div class="info_item">
                    <i class="iconfont icon-shijian"></i>
                    {{ formatMusicTime(videoData.pubDJProgramData.duration) }}</div>
            </div>
        </div>
        <div class="right flex_box_center_column">
            <i class="iconfont icon-Androidgengduo" @click="tapMenu"></i>
        </div>
    </div>

    <van-popup v-model:show="show" position="bottom" round>
        <div class="content">
            <van-cell-group>
				<van-cell title="播放" is-link @click="handlePlay">
					<template #right-icon>
						<van-icon name="play-circle-o" />
					</template>
				</van-cell>
			</van-cell-group>
        </div>
    </van-popup>

</template>
<script setup lang="ts">
    import { formatCountNumber, formatMusicTime } from '@/utils'
    import { ref, toRaw } from 'vue'
    import { usePlayerStore } from '@/store'
    import { formatSheet } from '@/utils/song'
    import { MusicType } from '@/types/store/player'
    const playerStore = usePlayerStore()
    const props = defineProps(['videoData'])
    const show = ref<boolean>(false)

    function tapMenu() {
        show.value = true
    }
    function handlePlay() {
        show.value = false
        const data = formatSheet(toRaw(props.videoData.pubDJProgramData.mainSong), MusicType.dj)
        playerStore.setCurSong(data, true)
    }

</script>
<style scoped lang="less">
    .voiceItem{
        display: flex;
        margin-bottom: 20px;
        align-items: center;
        &:active{
            opacity: 0.8;
        }
        .cover{
            width: 120px;
            padding-bottom: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 10px;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                object-fit: cover;
            }
        }
        .center{
            margin-left: 20px;
            flex: 1;
            .name{
                font-size: 28px;
                margin-bottom: 10px;
                color: var(--my-text-color-black);
                max-width: 420px;
            }
            .info{
                font-size: 24px;
                color: var(--my-text-color-gray);
                display: flex;
                .info_item{
                    margin-right: 10px;
                    .iconfont{
                        color: var(--my-text-color-gray);
                    }
                }
            }
        }
        .right{
            height: 100%;
            color: var(--my-text-color-gray);
            &:active{
                opacity: 0.8;
            }
            .iconfont{
                font-size: 36px;
            }
        }
    }
    .content{
        padding: 30px;
    }
</style>