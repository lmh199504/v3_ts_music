<template>
    <div class="newMv">
        <div class="top">
			<div class="recomend_title">最新MV</div>
			<van-button icon="play" round size="mini" @click="toMv">更多</van-button>
		</div>
        <van-skeleton title :row="1" :loading="loading">
            <div>
                <MvItem v-for="item in list" :key="item.id" :mv-data="item" />
            </div>
        </van-skeleton>
    </div>
</template>
<script setup lang="ts">
    import { reqNewMv } from '@/api/video'
    import { ref } from 'vue'
    import MvItem from '@/components/MvItem/index.vue'
    import type { MvDataInterface } from '@/types/public/video'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const loading = ref<boolean>(false)
    const list = ref<MvDataInterface[]>([])
    function getList() {
        loading.value = true
        reqNewMv({ limit: 10 })
        .then(res => {
            list.value = res.data.data
        })
        .finally(() => {
            loading.value = false
        })
    }

    function toMv() {
        router.push({
            path: '/mv'
        })
    }

    getList()
</script>
<style scoped lang="less">
.newMv{
    margin-top: 20px;
    background: var(--van-white);
    padding: 15px;
    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .recomend_title{
            font-size: 30px;
            font-weight: bold;
            color: var(--my-text-color-black);
        }
    }
}
</style>