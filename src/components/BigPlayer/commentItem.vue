<template>
    <div>
        <div>{{ comment.user.nickname }}</div>
        <div>{{ comment.content }}</div>
    </div>
</template>
<script setup lang="ts">
    import type { CommentData } from '@/types/public/comment'
    interface Props{
        comment: CommentData
    }
    withDefaults(defineProps<Props>(), {
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
        }
    })
</script>
<style scoped lang="less">
</style>