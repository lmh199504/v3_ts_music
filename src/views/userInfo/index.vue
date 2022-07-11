<template>
    <MiniPlayOut>
        <div class="userPage">
            <div class="nav">
                <div class="left flex_box_center_column">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="center"></div>
                <div class="right"></div>
            </div>
            <div class="content">
                <div class="back_ground">
                    <img v-if="userProfile.backgroundUrl" :src="userProfile.backgroundUrl" />
                </div>
            </div>
        </div>
    </MiniPlayOut>
</template>
<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { reqUserDetail } from '@/api/user'
    import { watch, reactive } from 'vue'
    import type { UserProfileData } from '@/types/public/user'
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
        listenSongs: 0
    })
    watch(() => route.query.id, (val) => {
        console.log(val)
        if (val) {
            getUserInfo()
        }
    }, { immediate: true })

    function getUserInfo() {
        reqUserDetail({ uid: Number(route.query.id) })
        .then(res => {
            console.log(res.data)
            userProfile.avatarUrl = res.data.profile
            userProfile.backgroundUrl = res.data.backgroundUrl
            userProfile.city = res.data.city
            userProfile.createTime = res.data.createTime
            userProfile.nickname = res.data.nickname
            userProfile.province = res.data.province
            userProfile.signature = res.data.signature
            userProfile.userId = res.data.userId
            userProfile.follows = res.data.follows
            userProfile.followeds = res.data.followeds
            userProfile.level = res.data.level
            userProfile.listenSongs = res.data.listenSongs
        })
    }
</script>
<style scoped lang="less">
.userPage{
    height: 100%;
    overflow-y: auto;
    background-color: var(--my-back-color-gray);
    .nav{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        font-size: 24px;
        height: 90px;
        box-sizing: border-box;
        padding: 30px;
        background-color: transparent;
        .left{
            .iconfont{
                font-size: 36px;
                font-weight: bold;
                color: var(--my-text-color-white);
            }
        }
    }
}
</style>