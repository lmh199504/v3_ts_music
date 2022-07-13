<template>
    <div class="comment_item">
        <div class="top_header">
            <div class="left" @click="toUser">
                <img class="avatar" :class="{ childavatar: ischild }" :src="comment.user.avatarUrl + '?param=140y140'" alt="">
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
        
        <div class="content" :class="{ childContent: ischild }">
            <div class="comment">{{ comment.content }}</div>
            <comment-item v-for="item in replyList" :ischild="true" :key="item.commentId" :comment-type="commentType" :source-id="sourceId" :comment="item" />
            <div v-if="comment.replyCount&&!openReply&&!loading" class="more_reply" @click="getReplyList">展开{{ comment.replyCount }}条评论>></div>
            <div v-if="comment.replyCount&&openReply&&hasMore&&!loading" class="more_reply" @click="getReplyList">查看更多>></div>
            <van-loading v-if="loading" color="#e20001" />
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { usePlayerStore } from '@/store'
    import type { CommentDataNew } from '@/types/public/comment'
    import { reqLikeComment, reqCommnetFloor } from '@/api/comment'
    import { CommentType } from '@/types/public/comment'
    interface Props{
        comment: CommentDataNew
        sourceId: number // 歌曲id
        commentType: CommentType
        ischild: boolean
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
                liked: false,
                replyCount: 0,
                beReplied: null,
                time: 0
            }
        },
        sourceId: 0,
        commentType: CommentType.song,
        ischild: false
    })
    const playerStore = usePlayerStore()
    const router = useRouter()
    const openReply = ref<boolean>(false) // 是否展开评论
    const hasMore = ref<boolean>(false) // 是否还有评论
    const replyList = ref<CommentDataNew[]>([]) // 回复列表
    const loading = ref<boolean>(false)
    const liked = ref<boolean>(props.comment.liked)
    const likedCount = ref<number>(props.comment.likedCount)
    const replyParams = {
        id: props.sourceId,
        type: props.commentType,
        parentCommentId: props.comment.commentId,
        limit: 20,
        time: 0
    }
    // 点赞
    function likeComment() {
        let params = {
            id: props.sourceId,
            cid: props.comment.commentId,
            t: 0,
            type: props.commentType
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

    // 获取回复列表
    function getReplyList() {
        loading.value = true
        reqCommnetFloor(replyParams)
        .then(res => {
            openReply.value = true
            replyList.value = replyList.value.concat(res.data.data.comments)
            replyParams.time = res.data.data.time
            hasMore.value = res.data.data.hasMore
        })
        .finally(() => {
            loading.value = false
        })
    }
    // 用户中心
    function toUser() {
        playerStore.setPlayerVisible(false)
        router.push({
            path: '/userInfo',
            query: {
                id: props.comment.user.userId
            }
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
            .childavatar{
                width: 60px;
                height: 60px;
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
        white-space: wrap;
        word-break: break-all;
        .comment{
            color: var(--my-text-color-black);

        }
        .more_reply{
            color: var(--my-text-color-blue);
            margin-top: 10px;
        }
    }
    .childContent{
        padding-left: 80px;
    }
}
</style>