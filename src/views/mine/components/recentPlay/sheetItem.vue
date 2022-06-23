<template>
    <div class="voiceItem" @click="goDetail">
        <div class="left">
            <div class="cover">
                <img :src="sheetData.coverImgUrl" alt="">
            </div>
        </div>
        <div class="center">
            <div class="name">{{ sheetData.name }}</div>
            <div class="info">
                <div class="info_item" v-if="sheetData.creator">
                    <span style="margin-right: 5px;">by</span>
                    {{ sheetData.creator.nickname }}</div>
            </div>
        </div>
        <div class="right">{{ dateFormat(playTime, 'yyyy-MM-dd') }}</div>
    </div>

</template>
<script setup lang="ts">
    import { dateFormat } from '@/utils'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const props = defineProps(['sheetData', 'playTime'])

    function goDetail() {
        router.push({
            path: '/songSheetDetail',
            query: {
                id: props.sheetData.id
            }
        })
    }
</script>
<style scoped lang="less">
    .voiceItem{
        display: flex;
        margin-bottom: 20px;
        align-items: center;
        &:active{
            opacity: 0.8;
        }
        .cover{
            width: 120px;
            padding-bottom: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 10px;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                object-fit: cover;
            }
        }
        .center{
            margin-left: 20px;
            flex: 1;
            .name{
                font-size: 28px;
                margin-bottom: 10px;
                color: var(--my-text-color-black);
                max-width: 420px;
            }
            .info{
                font-size: 24px;
                color: var(--my-text-color-gray);
                display: flex;
                .info_item{
                    margin-right: 10px;
                    .iconfont{
                        color: var(--my-text-color-gray);
                    }
                }
            }
        }
        .right{
            font-size: 24px;
            height: 100%;
            color: var(--my-text-color-gray);
            &:active{
                opacity: 0.8;
            }
            .iconfont{
                font-size: 36px;
            }
        }
    }
    .content{
        padding: 30px;
    }
</style>