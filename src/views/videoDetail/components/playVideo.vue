<template>
    <div class="container">
        <video ref="videoRef" class="video" :src="url" controls></video>
    </div>
</template>
<script setup lang="ts">
    import { ref, watch, nextTick } from 'vue'
    import { reqVideoUrl } from '@/api/video'
    const props = defineProps(['videoData', 'index', 'curIndex'])
    const videoRef = ref<HTMLVideoElement>()
    const url = ref<string>('')
    function getVideoUrl() {
        reqVideoUrl({ id: props.videoData.vid })
        .then(res => {
            url.value = res.data.urls[0].url
        })
    }
    watch(() => props.curIndex, () => {
        nextTick(() => {
            if (videoRef.value) {
                if (props.curIndex == props.index) {
                    // console.log('播放' + props.index)
                    videoRef.value.currentTime = 0
                    videoRef.value.play()
                } else {
                    videoRef.value.pause()
                    // console.log('暂停' + props.index)
                }
            }
        })
    }, { immediate: true })
    getVideoUrl()
</script>
<style scoped lang="less">
    .container{
        height: 100%;
        width: 100%;
        .video{
            height: 100%;
            width: 100%;
        }
    }
</style>