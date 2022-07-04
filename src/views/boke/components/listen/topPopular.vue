<template>
    <div class="list">
        <van-row :gutter="10">
            <van-col :span="8" v-for="item in list" :key="item.id">
                <popularItemVue :popular-data="item" />
            </van-col>
        </van-row>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { reqTopPopular } from '@/api/dj'
import popularItemVue from './popularItem.vue';
import type { PopularData } from '@/types/public/dj'

const list = ref<PopularData[]>([])
function getList() {
    reqTopPopular({ limit: 30 })
    .then(res => {
        list.value = res.data.data.list
    })
}
getList()
</script>
<style scoped lang="less">
.list{
    padding: 30px;
}
</style>