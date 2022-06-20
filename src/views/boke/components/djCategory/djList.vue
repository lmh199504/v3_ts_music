<template>
    <van-list :loading="loading" @load="onLoad" :finished="finished">
        <div class="list">
            <DjItem v-for="item in list" :key="item.id" :dj-data="item" :box-type="BoxType.line"/>
        </div>
    </van-list>
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import { reqDjHotByType } from '@/api/dj'
    import DjItem from '@/components/DjItem/index.vue'
    import { DjData } from '@/types/public/dj'
    import { BoxType } from '@/types/public'
    interface Props{
        cateId: number
    }
    const props = withDefaults(defineProps<Props>(), {
        cateId: 0
    })
    const list = ref<Array<DjData>>([])
    const loading = ref<boolean>(false)
    const finished = ref<boolean>(false)
    let offset = 0
    const limit = 30
    function getList() {
        const data = {
            limit: limit,
            offset: offset * limit,
            cateId: props.cateId
        }
        loading.value = true
        reqDjHotByType(data)
        .then(res => {
            list.value = list.value.concat(res.data.djRadios)
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
</script>
<style scoped lang="less">
    .list{
        padding: 30px;
    }
</style>