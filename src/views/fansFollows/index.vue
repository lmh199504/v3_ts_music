<template>
    <MiniPlayOut>
        <div class="fans_follows">
            <van-tabs>
                <van-tab title="关注">
                    <div class="container">
                        <Follows :user-id="userId" />
                    </div>
                </van-tab>
                <van-tab title="粉丝">
                    <div class="container">
                        <Fans :user-id="userId" />
                    </div>
                </van-tab>
                <template #nav-left>
                    <div class="tab_right" @click="onClickLeft">
                        <i class="iconfont icon-fanhui"></i>
                    </div>
                </template>
                <template #nav-right>
                    <div class="tab_left" @click="toSearch">
                        <i class="iconfont icon-sousuo"></i>
                    </div>
                </template>
            </van-tabs>
        </div>
    </MiniPlayOut>
</template>
<script setup lang="ts">
import { onClickLeft } from '@/utils/back'
import Fans from './components/fans.vue'
import Follows from './components/follows.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userId = Number(route.query.id)
function toSearch() {
    router.push({
        path: '/search'
    })
}
</script>
<style scoped lang="less">
.fans_follows{
    height: 100%;
    overflow: auto;
    background-color: var(--my-back-color-gray);
    .tab_right{
        box-sizing: border-box;
        padding-left: 30px;
        width: 150px;
        box-sizing: border-box;
        .iconfont{
            font-size: 40px;
            font-weight: 600;
            color: var(--my-text-color-black);
        }
    }
    .tab_left{
        text-align: right;
        box-sizing: border-box;
        padding-right: 30px;
        width: 150px;
        box-sizing: border-box;
        .iconfont{
            font-size: 40px;
            font-weight: 600;
            color: var(--my-text-color-black);
        }
    }
    .container{
        padding: 30px;
        box-sizing: border-box;
    }
}
</style>