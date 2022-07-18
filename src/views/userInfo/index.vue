<template>
    <MiniPlayOut>
        <div class="userPage" ref="mine" @scroll="scroll">
            <div class="nav" :style="navStyle">
                <div class="left flex_box_center_column" @click="onClickLeft">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="center">
                    <div>{{ userProfile.nickname }}</div>
                </div>
                <div class="right"></div>
            </div>
            <div class="content">
                <div class="back_ground">
                    <img v-if="userProfile.backgroundUrl" :src="userProfile.backgroundUrl" />
                </div>
                <div class="main_content">
                    <div class="box_white_container user_info">
                        <div class="user_img">
                            <img v-if="userProfile.avatarUrl" :src="userProfile.avatarUrl + '?param=140y140'" alt="">
                        </div>
                        <div class="user_name">{{ userProfile.nickname }}</div>
                        <div class="other_info">
                            <div class="other_info_item" @click="toFollow"><span>{{ userProfile.follows }}</span>关注</div>
                            <div class="other_info_item" @click="toFollow"><span>{{ userProfile.followeds }}</span>粉丝</div>
                            <div class="other_info_item">Lv.{{ userProfile.level }}</div>
                        </div>
                        <div class="tags">
                            <div class="tag">{{ cityName }}</div>
                            <div class="tag">
                                村龄{{ userProfile.createDays }}年
                            </div>
                        </div>
                        <div class="follow_btn">
                            <van-button v-if="userProfile.followed"  type="danger" :loading="followLoding" round size="small" @click="followUser(2)">
                                取消关注</van-button>
                            <van-button v-else type="danger" :loading="followLoding" round size="small" @click="followUser(1)">
                                关注</van-button>    
                            <van-button round size="small" class="msg_btn" @click="sendMsg">私信</van-button>
                        </div>
                    </div>
                    <van-tabs :lazy-render="false">
                        <van-tab title="主页">
                            <MusicTaste :listenSongs="userProfile.listenSongs" :user-id="userId"/>
                            <CreateSheet :user-id="userId" />
                            <CollectSheet :user-id="userId" />
                        </van-tab>
                        <van-tab>
                            <template #title>
                                <van-badge :content="userProfile.eventCount" :show-zero="false" :offset="[-10, 8]">
                                    <div style="padding: 0 25px;">动态</div>
                                </van-badge>
                            </template>
                            <EventList :user-id="userId" />
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>
    </MiniPlayOut>
</template>
<script setup lang="ts">
import { useSystemStore } from '@/store'
import { onClickLeft } from '@/utils/back'
import { useRoute } from 'vue-router'
import { reqUserDetail } from '@/api/user'
import { watch, reactive, ref, computed, ComputedRef } from 'vue'
import type { UserProfileData } from '@/types/public/user'
import { getCityName } from '@/utils'
import { reqFollow } from '@/api/user'
import { Toast } from 'vant'
import MusicTaste from './components/musicTaste.vue'
import CollectSheet from './components/collectSheet.vue'
import CreateSheet from './components/createSheet.vue'
import { Mode } from '@/store/system'
import { storeToRefs } from 'pinia'
import EventList from './components/eventList.vue'
import router from '@/router'

const mine = ref<HTMLDivElement | null>(null)
const systemStore = useSystemStore()
const { mode } = storeToRefs(systemStore)
const route = useRoute()
const userProfile = reactive<UserProfileData>({
    avatarUrl: '',
    backgroundUrl: '',
    city: 0,
    createTime: 0,
    nickname: '',
    province: 0,
    signature: '',
    userId: 0,
    follows: 0,
    followeds: 0,
    followed: false,
    level: 0,
    listenSongs: 0,
    createDays: 0,
    eventCount: 0
})
const cityName = ref<string>('')
const followLoding = ref<boolean>(false)
const navStyle = reactive({
    background: 'transparent'
})
watch(() => route.query.id, (val) => {
    if (val && route.path === '/userInfo') {
        getUserInfo()
    }
}, { immediate: true })
const userId: ComputedRef<number> = computed(() => {
    return Number(route.query.id)
})
function getUserInfo() {
    reqUserDetail({ uid: Number(route.query.id) })
        .then(res => {
            userProfile.avatarUrl = res.data.profile.avatarUrl
            userProfile.backgroundUrl = res.data.profile.backgroundUrl
            userProfile.city = res.data.profile.city
            userProfile.createTime = res.data.profile.createTime
            userProfile.nickname = res.data.profile.nickname
            userProfile.province = res.data.profile.province
            userProfile.signature = res.data.profile.signature
            userProfile.userId = res.data.profile.userId
            userProfile.follows = res.data.profile.follows
            userProfile.followeds = res.data.profile.followeds
            userProfile.followed = res.data.profile.followed
            userProfile.level = res.data.level
            userProfile.listenSongs = res.data.listenSongs
            userProfile.createDays = Math.round(res.data.createDays / 365)
            userProfile.eventCount = res.data.profile.eventCount
            cityName.value = getCityName(userProfile.province, userProfile.city)
        })
}
function followUser(type: number) {
    followLoding.value = true
    reqFollow({
        id: Number(route.query.id),
        t: type
    })
        .then(() => {
            Toast.success(type == 1 ? '关注成功' : '取消关注')
            userProfile.followed = !userProfile.followed
            followLoding.value = false
        })
        .catch(() => {
            followLoding.value = false
        })
}
function scroll() {
    const top = mine.value?.scrollTop || 0
    if (top>50) {
        navStyle.background = 'var(--my-back-color-white)'
    } else if (top == 0) {
        navStyle.background = 'transparent'
    } else {
        if (mode.value == Mode.light) { 
            navStyle.background = `rgba(255,255,255, ${ top*2/100 })`
        } else {
            navStyle.background = `rgba(0,0,0, ${ top*2/100 })`
        }
    }
}
// 私信
function sendMsg() {
    router.push({
        path: '/conversation',
        query: {
            id: userId.value
        }
    })
}
// 关注列表
function toFollow() {
    router.push({
        path: '/fansFollows',
        query: {
            id: userId.value
        }
    })
}
</script>
<style scoped lang="less">
.userPage {
    height: 100%;
    overflow-y: auto;
    background-color: var(--my-back-color-gray);
    width: 100%;

    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        font-size: 24px;
        height: 90px;
        box-sizing: border-box;
        padding: 30px;
        z-index: 10;
        .left {
            .iconfont {
                font-size: 36px;
                font-weight: bold;
                color: var(--van-nav-bar-icon-color);
            }
        }
        .center{
            flex: 1;
            text-align: center;
            color: var(--my-text-color-black);
        }
    }

    .content {
        width: 100%;

        .back_ground {
            background-color: var(--my-back-color-gray);
            height: 400px;

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        .main_content {
            padding: 30px;
            min-height: 60vh;
            margin-top: -50px;
            position: relative;
            z-index: 1;
            :deep(.van-tabs__nav){
                background-color: transparent;
            }
        }

        .user_info {
            .user_img {
                height: 100px;
                width: 100px;
                margin: auto;
                margin-top: -60px;
                border-radius: 50%;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .user_name {
                font-size: 28px;
                font-weight: bold;
                color: var(--my-text-color-black);
                text-align: center;
                margin-top: 15px;
            }

            .other_info {
                display: flex;
                justify-content: center;
                margin-top: 20px;

                .other_info_item {
                    padding: 0 20px;
                    position: relative;
                    font-size: 24px;
                    color: var(--my-text-color-gray);

                    span {
                        margin-right: 5px;
                    }

                    &:last-child {
                        &:after {
                            display: none;
                        }
                    }

                    &:after {
                        content: "";
                        display: block;
                        height: 20px;
                        width: 2px;
                        background: var(--my-text-color-gray);
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }

            .tags {
                display: flex;
                justify-content: center;

                .tag {
                    color: var(--my-text-color-black);
                    font-size: 24px;
                    height: 60px;
                    border: 2px solid var(--van-gray-3);
                    min-width: 100px;
                    text-align: center;
                    line-height: 60px;
                    padding: 0 20px;
                    box-sizing: border-box;
                    border-radius: 30px;
                    margin: 20px 10px;
                }
            }

            .follow_btn {
                display: flex;
                justify-content: center;
                .msg_btn{
                    margin-left: 20px;
                }
            }
        }
    }
}
.event_count{
    font-size: 24px;
    display: inline-block;
    margin-left: 10px;
    border-radius: 10px;
    background: #fff;
}
</style>