<!-- 一起听消息 -->
<template>
    <div class="listen_together">
        1111
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
const  msgText = computed(() => {
    return JSON.parse(props.msg).msg
})
</script> 
<style scoped lang="less">
</style>