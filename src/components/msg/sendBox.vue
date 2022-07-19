<template>
    <div class="send_box">
        <div class="tool_box box_shadow">
            <div class="textarea">
                <textarea placeholder="发送消息" rows="1" resize="false" v-model.trim="text"></textarea>
            </div>
            <div class="icon flex_box_center_column" @click="handleEmo">
                <i class="iconfont icon-ma"></i>
            </div>
            <div class="icon flex_box_center_column" @click="handleTools">
                <i class="iconfont icon-icon_tianjia"></i>
            </div>
            <div class="send_btn flex_box_center_column">
                <van-button size="small" :type="text ? 'primary' : 'default'" round :loading="loading" @click="sendTextMsg">发送</van-button>
            </div>
        </div>
        <div class="tool_list" :style="{ height: showTools ? '250px' : '0px' }">
            <div class="tool_wrapper">
                <van-row>
                    <van-col>
                        <van-uploader :after-read="afterRead" />
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="emo_wrapper" :style="{ height: showEmo ? '250px' : '0px' }">
            <div class="emojis">
                <van-row>
                    <van-col v-for="item in emojiName" :span="3" :key="item">
                        <div class="flex_box_center_column" @click="chooseEmoji(item)">
                            <img :src="emojiUrl + emojiMap[item]" class="emoji_img" />
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { emojiMap, emojiName, emojiUrl } from '@/utils/emojiMap'
import { reqSendText } from '@/api/msg'
import { MsgData } from '@/types/public/msg'

interface Props{
    toUser: number
}
const props = withDefaults(defineProps<Props>(), {
    toUser: 0
})
const loading = ref<boolean>(false)
const text = ref<string>('')
const showTools = ref<boolean>(false)
const showEmo = ref<boolean>(false)
const emit = defineEmits<{
    (e: 'changeHeight'): void
    (e: 'sendSuccess', value: MsgData[]): void
}>()
function handleEmo() {
    console.log('点击表情')
    showEmo.value = !showEmo.value
    showTools.value = false
    setTimeout(() => {
        emit('changeHeight')
    }, 500)
}
function handleTools() {
    console.log('点击工具')
    showTools.value = !showTools.value
    showEmo.value = false
    setTimeout(() => {
        emit('changeHeight')
    }, 500)
}
function hideAll() {
    if (showEmo.value || showTools.value) {
        showEmo.value = false
        showTools.value = false
        setTimeout(() => {
            emit('changeHeight')
        }, 500)
    }
}
// 选择表情
function chooseEmoji(emoji: string): void {
    text.value += emoji
}
// 发送文本消息
function sendTextMsg() {
    if (!text.value) return
    loading.value = true
    reqSendText({
        user_ids: props.toUser,
        msg: text.value
    })
    .then(res => {
        console.log(res)
        text.value = ''
        emit('sendSuccess', res.data.newMsgs)
    })
    .finally(() => {
        loading.value = false
    })
}
// 发送图片 暂无接口
// eslint-disable-next-line
function afterRead(file: any) {
    console.log(file)
}
defineExpose({
    hideAll
})
</script>
<style scoped lang="less">
.send_box{
    min-height: 80px;
    box-sizing: border-box;
    font-size: 24px;
    height: fit-content;
    transition: all 4s ease;
    .tool_box{
        display: flex;
        min-height: 80px;
        padding: 20px;
        .textarea{
            flex: 1;
            font-size: 28px;
            height: 80px;
            textarea{
                width: 100%;
                height: 100%;
                line-height: 80px;
                border-radius: 40px;
                padding: 0 10px;
                box-sizing: border-box;
                resize: none;
                border: 1px solid var(--van-gray-3);
                background-color: var(--my-back-color-white);
                color: var(--my-text-color-black);
                &::placeholder{
                    font-size: 28px;
                }
            }
        }
        .icon{
            flex-shrink: 0;
            width: fit-content;
            color: var(--my-text-color-gray);
            margin-left: 20px;
            .iconfont{
                font-size: 40px;
            }
        }
        .send_btn{
            margin-left: 20px;
        }
    }
    .tool_list{
        height: 0px;
        overflow: hidden;
        transition: all 0.5s ease;
        .tool_wrapper{
            padding: 30px;
            box-sizing: border-box;
            :deep(.van-uploader__upload){
                background-color: var(--my-back-color-white);
            }
        }
    }
    .emo_wrapper{
        height: 0px;
        overflow: hidden;
        transition: all 0.5s ease;
        box-sizing: border-box;
        .emojis{
            height: 100%;
            width: fit-content;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
            .emoji_img{
                width: 60px;
                height: 60px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>