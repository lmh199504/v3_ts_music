<template>
    <van-tabs v-model:active="active" swipeable sticky background="transparent" line-width="0">
        <van-tab title="热门">
            <template #title>
                <div class="tab_title" :class="{ active_tab: active == 0 }">
                    热门
                </div>
            </template>
            <TopList />
        </van-tab>
        <van-tab title="音乐">
            <template #title>
                <div class="tab_title" :class="{ active_tab: active == 1 }">
                    音乐
                </div>
            </template>
            <DjListVue :cate-id="2" />
        </van-tab>
        <van-tab title="情感">
            <template #title>
                <div class="tab_title" :class="{ active_tab: active == 2 }">
                    情感
                </div>
            </template>
            <DjListVue :cate-id="3" />
        </van-tab>
        <van-tab title="二次元">
            <template #title>
                <div class="tab_title" :class="{ active_tab: active == 3 }">
                    二次元
                </div>
            </template>
            <DjListVue :cate-id="3001" />
        </van-tab>
        <van-tab title="红人馆">
            <template #title>
                <div class="tab_title" :class="{ active_tab: active == 4 }">
                    红人馆
                </div>
            </template>
            <topPopularVue />
        </van-tab>
    </van-tabs>
</template>
<script setup lang="ts">
import { reqTodayPerfered } from '@/api/dj'
import { ref } from 'vue'
import TopList from './topList.vue'
import DjListVue from '../djCategory/djList.vue'
import topPopularVue from './topPopular.vue'

const active = ref<number>(0)
function getList() {
    reqTodayPerfered()
}
getList()
</script>
<style scoped lang="less">

.tab_title{
    padding: 10px 20px;
    color: var(--my-texr-color-black);
}
.active_tab{
    background-color: var(--my-primary-color);
    color: var(--my-text-color-white);
    border-radius: 30px;
}
</style>