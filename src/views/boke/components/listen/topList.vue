<template>
    <div class="list">
        <van-row gutter="10">
            <van-col :span="8" v-for="item in list" :key="item.id">
                <DjItem :dj-data="item" :box-type="BoxType.box"/>
            </van-col>
        </van-row>
    </div>
</template>
<script setup lang="ts">
import { reqTopList } from '@/api/dj'
import { ref } from 'vue'
import DjItem from '@/components/DjItem/index.vue'
import type { DjData } from '@/types/public/dj'
import { BoxType } from '@/types/public'

const list =  ref<DjData[]>([])
function getList() {
    reqTopList()
    .then(res => {
        list.value = list.value.concat(res.data.toplist)
    })
}
getList()
</script>
<style scoped lang="less">
.list{
    padding: 30px;
}
</style>