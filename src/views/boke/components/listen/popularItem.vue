<template>
    <div class="popular">
        <div class="cover">
            <img class="coverImg" :src="popularData.avatarUrl+ '?param=140y140'" alt="">
        </div>
        <div class="name">{{ popularData.nickName }}</div>
    </div>
</template>
<script setup lang="ts">
    import type { PopularData } from '@/types/public/dj'

    interface Props{
        popularData: PopularData
    }
    withDefaults(defineProps<Props>(), {
        popularData: () => {
            return {
                avatarUrl: '',
                id: 0,
                liveId: 0,
                nickName: '',
                roomNo: 0,
                userFollowedCount: 0
            }
        }
    })
</script>
<style scoped lang="less">
.popular{
    margin-bottom: 30px;
    .cover{
        width: 100%;
        padding-bottom: 100%;
        position: relative;
        .coverImg{
            width: 100%;
            height: 100%;
            border-radius: 10px;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
    .name{
        margin-top: 5px;
        font-size: 30px;
    }
}
</style>