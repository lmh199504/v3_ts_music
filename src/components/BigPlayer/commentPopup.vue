<template>
    <teleport to="body">
        <van-popup v-model:show="show" position="bottom" round>
            <div class="content">
                <van-list :loading="loading" :finished="finished" @load="onLoad">
                    <CommentItem v-for="item in list" :key="item.commentId" :comment="item" :songid="id" />
                </van-list>
            </div>
        </van-popup>
    </teleport>
</template>
<script setup lang="ts">
    import { computed } from 'vue'
    import { watch, ref } from 'vue'
    import { reqSongComment } from '@/api/comment'
    import CommentItem from './commentItem.vue'
    import type { CommentData } from '@/types/public/comment'
    interface Props{
        visible: boolean
        id: number
    }
    const list = ref<CommentData[]>([])
    const loading = ref<boolean>(true)
    const finished = ref<boolean>(false)
    const props = withDefaults(defineProps<Props>(), {
        visible: false,
        number: 0
    })
    const emit = defineEmits < {
		(e: 'update:visible', value: boolean): void
	} > ()
    const show = computed({
        get() {
            return props.visible
        },
        set(val) {
            emit('update:visible', val)
        }
    })
    watch(() => props.id, (val) => {
        if (val)  {
            list.value = []
            getList()
        }
    })
    function getList() {
        if (!props.id) return
        loading.value = true
        reqSongComment({
            id: props.id
        })
        .then(res => {
            list.value = list.value.concat(res.data.comments)
            loading.value = false
            finished.value = !res.data.more
        })
        .catch(() => {
            loading.value = false
        })
    }
    function onLoad() {
        getList()
    }
    getList()
</script>
<style scoped lang="less">
.content{
    height: 70vh;
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    overflow-y: auto;
}
</style>