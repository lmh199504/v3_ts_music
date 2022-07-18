<!-- 一起听消息 -->
<template>
    <div class="listen_together">
        <div>{{ msgText }}</div>
        <div class="general_msg">
            <img class="cover_img" :src="msgJson.generalMsg.cover" alt="">
            <span>{{ msgJson.generalMsg.title }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface Props{
    msg: string
}
const props = withDefaults(defineProps<Props>(), {
    msg: '{}'
})
const msgText = computed(() => {
    return JSON.parse(props.msg).msg
})
const msgJson = computed(() => {
    return JSON.parse(props.msg)
})
</script> 
<style scoped lang="less">
.listen_together{
    .general_msg{
        margin-top: 20px;
        display: flex;
        align-items: center;
        // background-color: var(--my-back-color-gray);
        padding: 20px;
    }
    .cover_img{
        width: 80px;
        height: 80px;
        border-radius: 10px;
        margin-right: 20px;
    }
}
</style>