<template>
    <MiniPlayOut>
        <div class="recent_play">
            <van-nav-bar
                title="最近播放"
                fixed
                placeholder
                left-arrow
                @click-left="onClickLeft"
            ></van-nav-bar>
            <van-tabs v-model:active="active" sticky offset-top="1.22667rem">
                <van-tab title="歌曲">
                    <RecentSong />
                </van-tab>
                <van-tab title="视频">
                    <RecentVideo />
                </van-tab>
                <van-tab title="声音">
                    <RecentVoice />
                </van-tab>
                <van-tab title="歌单">
                    <RecentSheet />
                </van-tab>
                <!-- <van-tab title="专辑">
                    <RecentAlbum />
                </van-tab> -->
                <van-tab title="播客">
                    <RecentDj />
                </van-tab>
            </van-tabs>
        </div>
    </MiniPlayOut>
</template>
<script lang="ts" setup>
    import { onClickLeft } from '@/utils/back'
    import { ref } from 'vue'
    import RecentSong from './components/recentPlay/recentSong.vue'
    import RecentVideo from './components/recentPlay/recentVideo.vue'
    import RecentVoice from './components/recentPlay/recentVoice.vue'
    import RecentSheet from './components/recentPlay/recentSheet.vue'
    import RecentDj from './components/recentPlay/recentDj.vue'
    // import RecentAlbum from './components/recentPlay/recentAlbum.vue'
    const active = ref<number>(0)
</script>
<style scoped lang="less">
    .recent_play{
        height: 100%;
        overflow: auto;
    }
    
</style>