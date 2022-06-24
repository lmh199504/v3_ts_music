<template>
    <div class="list">
        <VideoItem v-for="item in list" :key="item.resourceId" :video-data="item.data" :play-time="item.playTime" :resourceType="item.resourceType" />
        <van-empty v-if="list.length == 0"/>
    </div>
</template>
<script setup lang="ts">
    import { reqRecentVideo } from '@/api/recent'
    import type { recentVideoInterface } from '@/types/public/video'
    import VideoItem from './videoItem.vue';
    import { ref } from 'vue'
    import { Toast } from 'vant'
    interface ListData{
        data: recentVideoInterface
        playTime: number
        resourceId: string
        resourceType: string
    }

    const list = ref<ListData[]>([])
    function getList() {
        const params = {
            limit: 300
        }
        const reqLoading = Toast.loading({
            duration: 0,
            message: '加载中',
            overlay: true
        })
        reqRecentVideo(params)
        .then(res => {
            list.value = res.data.data.list
        })
        .finally(() => {
            reqLoading.clear()
        })
    }
    getList()
</script>
<style scoped lang="less">
    .list{
        padding: 30px;
    }
</style>