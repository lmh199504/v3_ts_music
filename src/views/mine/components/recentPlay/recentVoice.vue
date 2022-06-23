<template>
    <div class="list">
        <VoiceItem v-for="item in list" :key="item.resourceId" :video-data="item.data" />
        <van-empty v-if="list.length == 0"/>
    </div>
</template>
<script setup lang="ts">
    import { reqRecentVoice } from '@/api/recent'
    import { ref } from 'vue'
    import VoiceItem from './voiceItem.vue';
    import { RecentVoiceInterface } from '@/types/public/voice'
    import { Toast } from 'vant'
    interface ListData{
        data: RecentVoiceInterface
        playTime: number
        resourceId: string
        resourceType: string
    }

    const list = ref<ListData[]>([])
    function getList() {
        const reqLoading = Toast.loading({
            duration: 0,
            message: '加载中',
            overlay: true
        })
        reqRecentVoice({ limit: 100 })
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