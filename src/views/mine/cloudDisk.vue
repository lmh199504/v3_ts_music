<template>
    <MiniPlayOut>
        <van-nav-bar title="我的云盘" fixed placeholder left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-list :loading="loading" :finished="finished" @load="onLoad">
            <div class="">
                <div>
                    <i class="iconfont icon-bofang1"></i>
                    <div>播放全部</div>
                </div>
            </div>
            <CloudItem v-for="(item, index) in list" :key="item.songId" :song-data="item.simpleSong" :song-id="item.songId" :index="index+1">{{ item.simpleSong.name }}</CloudItem>
        </van-list>
    </MiniPlayOut>
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import { onClickLeft } from '@/utils/back'
    import { reqCloudMusic } from '@/api/user'
    import type { CloudDiskItem } from '@/types/public/cloudDisk'
    import CloudItem from './components/cloudDisk/cloudItem.vue'
    const loading = ref<boolean>(true)
    const finished = ref<boolean>(false)
    const list = ref<CloudDiskItem[]>([])
    const limit = 30
    let offset = 0
    function getList() {
        const params = {
            limit: limit,
            offset: offset * limit
        }
        loading.value = true
        reqCloudMusic(params)
        .then(res => {
            console.log(res)
            list.value = list.value.concat(res.data.data)
            finished.value = !res.data.hasMore
        })
        .finally(() => {
            loading.value = false
        })
    }
    function onLoad() {
        offset++ 
        getList()
    }

    getList()
</script>