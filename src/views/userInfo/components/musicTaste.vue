<template>
    <div class="musicTaste box_white_container">
        <div class="title">音乐品味</div>
        <div>
            <div class="listen_rank">
                <div class="left">
                    <div class="cover flex_box_center_column">
                        <i class="iconfont icon-paihang"></i>
                    </div>
                </div>
                <div class="right">
                    <div class="right_title">听歌排行</div>
                    <div class="right_text">累计听歌{{ listenSongs }}首</div>
                </div>
            </div>

            <!-- <div class="listen_rank">
                <div class="left">
                    <div class="cover flex_box_center_column">
                        <i class="iconfont icon-xihuan"></i>
                    </div>
                </div>
                <div class="right">
                    <div class="right_title">我喜欢的音乐</div>
                    <div class="right_text">{{ total }}首，累计播放300次</div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { reqLikeList } from '@/api/user'
import { watch, ref } from 'vue';
interface Props{
    listenSongs: number
    userId: number
}
const props = withDefaults(defineProps<Props>(), {
    listenSongs: 0,
    userId: 0
})
const total = ref<number>(0)
watch(() => props.userId, (val) => {
    if (val) getLikeList()
}, { immediate: true })
function getLikeList() {
    reqLikeList({
        uid: props.userId,
        timestamp: Date.now()
    })
    .then(res => {
        total.value = res.data.ids.length
    })
}

</script>
<style scoped lang="less">
.musicTaste{
    margin-top: 30px;
}
.title{
    font-size: 30px;
    color: var(--my-text-color-black);
    font-weight: bold;
    margin-bottom: 20px;
    span{
        margin-left: 10px;
        font-size: 26px;
        color: var(--my-text-color-gray);
    }
}
.listen_rank{
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    &:hover{
        opacity: 0.8;
    }
    .left{
        margin-right: 20px;
        .cover{
            width: 100px;
            height: 100px;
            border-radius: 20px;
            background: var(--my-primary-color);
            .iconfont{
                color: #fff;
                font-size: 30px;
            }
        }
    }
    .right{
        .right_title{
            font-weight: bold;
            color: var(--my-text-color-black);
            font-size: 28px;
        }
        .right_text{
            color: var(--my-text-color-gray);
            font-size: 24px;
        }
    }
}
</style>