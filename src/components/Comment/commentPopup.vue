<template>
    <teleport to="body">
        <van-popup v-model:show="show" position="bottom" round>
            <div class="content">
                <div class="top box_shadow">
                    <div class="left">
                        <div class="sortList">
                            <div class="sortItem" :class="{ sortItem_active: sortType==1 }" @click="setSortType(1)">推荐</div>
                            <div class="sortItem" :class="{ sortItem_active: sortType==2 }" @click="setSortType(2)">热门</div>
                            <div class="sortItem" :class="{ sortItem_active: sortType==3 }" @click="setSortType(3)">时间</div>
                        </div>
                    </div>
                    <div class="right flex_box_center_column">
                        <van-icon name="cross" @click="show=false" />
                    </div>
                </div>
                <div class="scroll_content">
                    <van-list :loading="loading" :finished="finished" @load="onLoad" finished-text="没有更多了~">
                        <CommentItem 
                            v-for="item in list" 
                            :key="item.commentId" 
                            :comment="item" 
                            :sourceId="sourceId" 
                            :comment-type="commentType"
                            :ischild="false"
                        />
                    </van-list>
                </div>
            </div>
        </van-popup>
    </teleport>
</template>
<script setup lang="ts">
    import { computed } from 'vue'
    import { watch, ref } from 'vue'
    import { reqCommnet } from '@/api/comment'
    import CommentItem from './commentItem.vue'
    import type { CommentDataNew } from '@/types/public/comment'
    import { CommentType } from '@/types/public/comment'
    interface Props{
        visible: boolean
        sourceId: number
        commentType: CommentType
    }
    let pageNo = 0
    let cursor = 0
    const sortType = ref<number>(1)
    const list = ref<CommentDataNew[]>([])
    const loading = ref<boolean>(true)
    const finished = ref<boolean>(false)
    const props = withDefaults(defineProps<Props>(), {
        visible: false,
        number: 0,
        commentType: CommentType.song
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
    watch(() => props.sourceId, (val) => {
        if (val)  {
            pageNo = 0
            list.value = []
            getList()
        }
    })
    function getList() {
        if (!props.sourceId) return
        loading.value = true
        pageNo++
        reqCommnet({
            id: props.sourceId,
            type: props.commentType,
            pageNo: pageNo,
            pageSize: 20,
            sortType: sortType.value,
            cursor: pageNo!==1 ? cursor : undefined
        })
        .then(res => {
            list.value = list.value.concat(res.data.data.comments)
            loading.value = false
            finished.value = !res.data.data.hasMore
            if (list.value.length) {
                cursor = list.value[list.value.length - 1].time
            }
        })
        .catch(() => {
            loading.value = false
        })
    }
    function onLoad() {
        getList()
    }
    function setSortType(type: number): void {
        sortType.value = type
        pageNo = 0
        list.value = []
        getList()
    }
    getList()
</script>
<style scoped lang="less">
.content{
    height: 70vh;
    width: 100%;
    box-sizing: border-box;
    overflow-y: hidden;
    flex-direction: column;
    display: flex;
    .top{
        align-items: center;
        display: flex;
        padding: 20px;
        .left{
            flex: 1;
            .sortList{
                display: flex;
                .sortItem{
                    font-size: 30px;
                    position: relative;
                    padding: 0 30px;
                    &::after{
                        content: '';
                        display: block;
                        position: absolute;
                        right: 0px;
                        width: 2px;
                        height: 100%;
                        background-color: var(--my-icon-color);
                        top: 0;
                    }
                    &:last-child{
                        &::after{
                            display: none;
                        }
                    }
                }
                .sortItem_active{
                    color: var(--my-primary-color);
                }
            }
        }
        .right{
            :deep(.van-icon){
                color: var(--my-icon-color);
                font-size: 40px;
            }
        }
    }
    .scroll_content{
        overflow-y: auto;
        padding: 30px;
        box-sizing: border-box;
    }
}
</style>