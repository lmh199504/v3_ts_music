<!-- 时间消息 -->
<template>
    <div class="text_msg">{{ msgText }}</div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { dateFormat } from '@/utils'

interface Props{
    msg: string
}
const props = withDefaults(defineProps<Props>(), {
    msg: '{}'
})
const  msgText = computed(() => {
    return dateFormat(JSON.parse(props.msg).msg, 'yyyy-MM-dd hh:mm:ss')
})
</script> 
<style scoped lang="less">
.text_msg{
    color: var(--my-text-color-gray);
    font-size: 24px;
    font-weight: 400;
}
</style>