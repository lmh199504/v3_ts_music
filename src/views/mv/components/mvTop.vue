<template>
    <div>
        <van-list :loading="loading" :finished="finished" @load="onLoad">
            <MvTopItem v-for="(item, index) in list" :key="item.id" :mv-data="item" :index="index" />
        </van-list>
    </div>
</template>
<script lang="ts" setup>
    import { reqMvTop } from '@/api/video'
    import { ref } from 'vue'
    import MvTopItem from './topMvItem.vue'
    import type { MvInterface } from '@/types/public/mv'
    interface Props{
        title: string
    }
    const list = ref<MvInterface[]>([])
    const loading = ref<boolean>(true)
    const finished = ref<boolean>(false)
    const limit = 30
    let offset = -1
    const props = withDefaults(defineProps<Props>(), {
        title: ''
    })
    function onLoad() {
        getList()
    }
    function getList() {
        offset++ 
        const params = {
            limit: limit,
            offset: offset*limit,
            area: props.title
        }
        loading.value = true
        reqMvTop(params)
        .then(res => {
            list.value = list.value.concat(res.data.data)
            finished.value = !res.data.hasMore
        })
        .finally(() => {
            loading.value = false
        })
    }
    getList()
</script>