<!-- 文本消息 -->
<template>
    <div class="text_msg">
        <div class="msg_wrapper" v-for="(item, index) in msgList" :key="index">
            <span v-if="item.name === 'text'">{{ item.text }}</span>
			<img class="img" v-else-if="item.name === 'img'" :src="item.src" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { decodeText } from '@/utils/decodeText'
interface Props{
    msg: string
}
const props = withDefaults(defineProps<Props>(), {
    msg: '{}'
})
const msgList = computed(() => {
    return decodeText(JSON.parse(props.msg))
})
</script> 
<style scoped lang="less">
.msg_wrapper{
    display: inline-block;
    .img{
        width: 40px;
        height: 40px;
    }
}
</style>