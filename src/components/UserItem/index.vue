<template>
    <div class="user_item">
        <div class="left" @click="toUser">
            <div class="coverImg">
                <img :src="userData.avatarUrl + '?param=140y140'" alt="">
            </div>
            <div class="singer_name">{{ userData.nickname }}</div>
        </div>
        <div class="right">
            <van-button v-if="followed" round size="small" @click="followUser">取消关注</van-button>
            <van-button v-else round size="small" @click="followUser">关注</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserInterface } from '@/types/public/user'
import { reqFollow } from '@/api/user';
import { Toast } from 'vant';
import { useRouter } from 'vue-router'
interface Props {
    userData: UserInterface
}
const router = useRouter()
const props = withDefaults(defineProps<Props>(), {
    userData: () => {
        return {
            nickname: 'string',
            userId: 0,
            avatarUrl: '',
            followed: false
        }
    }
})
const followed = ref<boolean>(props.userData.followed)

// 关注/取消关注
function followUser() {
    const t = followed.value ? 2 : 1
    reqFollow({
        id: props.userData.userId,  // t: number //1为关注,其他为取消关注
        t: t
    })
    .then(() => {
        Toast.success(followed.value ? '取消成功' : '关注成功')
        followed.value = !followed.value
    })
}
function toUser() {
    router.push({
        path: '/userInfo',
        query: {
            id: props.userData.userId
        }
    })
}
</script>

<style scoped lang="less">
.user_item {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--van-cell-border-color);

    .left {
        display: flex;
        align-items: center;

        .coverImg {
            width: 100px;
            height: 100px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 20px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .singer_name {
            font-size: 28px;
            color: var(--my-text-color-black);
        }
    }
}
</style>