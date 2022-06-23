<template>
    <MiniPlayOut>
        <van-nav-bar title="全部分类" left-arrow fixed placeholder @click-left="onClickLeft"></van-nav-bar>
        <van-tabs offset-top="1.22667rem" sticky>
            <van-tab v-for="item in categoryList" :key="item.id" :title="item.name">
                <DjList :cate-id="item.id" />
            </van-tab>
        </van-tabs>
    </MiniPlayOut>
</template>
<script lang="ts" setup>
    import { onClickLeft } from '@/utils/back'
    import { reqDjCatList, reqRecommendType } from '@/api/dj'
    import { ref } from 'vue'
    import DjList from './components/djCategory/djList.vue'
    import type { CategoryInterface } from '@/types/public/dj'
    const categoryList = ref<CategoryInterface[]>([])
    // 获取分类
    function getCatList() {
        reqDjCatList()
        .then(res => {
            categoryList.value = res.data.categories
        })
        reqRecommendType({ type: 2 })
    }

    getCatList()
</script>
<style scoped lang="less"></style>