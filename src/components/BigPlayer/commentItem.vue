<template>
    <div class="comment_item">
        <div class="top_header">
            <div class="left">
                <img class="avatar" :src="comment.user.avatarUrl + '?param=140y140'" alt="">
            </div>
            <div class="center">
                <div class="nickname">{{ comment.user.nickname }}</div>
                <div class="timestr">{{ comment.timeStr }}</div>
            </div>
            <div class="right">
                <i v-if="!liked" @click="likeComment" class="iconfont icon-dianzan"></i>
                <i v-else @click="likeComment" class="iconfont icon-dianzan1"></i>
                <div class="likedCount">{{ likedCount }}</div>
            </div>
        </div>
        
        <div class="content">{{ comment.content }}</div>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue'
    import type { CommentData } from '@/types/public/comment'
    import { reqLikeComment } from '@/api/comment'
    interface Props{
        comment: CommentData
        songid: number // 歌曲id
    }
    const props = withDefaults(defineProps<Props>(), {
        comment: () => {
            return {
                user: {
                    nickname: '',
                    userId: 0,
                    avatarUrl: '',
                    followed: false
                },
                timeStr: '',
                commentId: 0,
                content: '',
                likedCount: 0,
                liked: false
            }
        },
        songid: 0
    })
    const liked = ref<boolean>(props.comment.liked)
    const likedCount = ref<number>(props.comment.likedCount)
    function likeComment() {
        let params = {
            id: props.songid,
            cid: props.comment.commentId,
            t: 0,
            type: 0
        }
        if (liked.value === true) {
            params.t = 0
        } else {
            params.t = 1
        }
        reqLikeComment(params)
        .then(() => {
            if (liked.value) {
                likedCount.value--
            } else {
                likedCount.value++
            }
            liked.value = !liked.value
        })
    }
</script>
<style scoped lang="less">
.comment_item{
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    .top_header{
        display: flex;
        align-items: center;
        .left{
            margin-right: 20px;
            .avatar{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }
        .center{
            flex: 1;
            .nickname{
                font-size: 30px;
                color: var(--my-text-color-black);
            }
            .timestr{
                font-size: 24px;
                color: var(--my-text-color-gray);
            }
        }
        .right{
            font-size: 24px;
            .icon-dianzan1{
                color: var(--my-primary-color);
                font-size: 40px;
            }
            .icon-dianzan{
                color: var(--my-text-color-gray);
                font-size: 40px;
            }
            .likedCount{
                text-align: center;
            }
        }
    }
    .content{
        font-size: 28px;
        padding-left: 100px;
    }
}
</style>