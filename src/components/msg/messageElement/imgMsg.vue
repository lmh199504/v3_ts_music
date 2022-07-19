<template>
    <div class="img_msg" @click="previewImg">
        <img :src="msgJson.picInfo.picUrl" alt="">
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
const emit = defineEmits<{
    (e: 'previewImg', value: string): void
}>()
const msgJson = computed(() => {
    return JSON.parse(props.msg)
})
function previewImg() {
    emit('previewImg', msgJson.value.picInfo.picUrl)
}
</script>
<style scoped lang="less">
.img_msg{
    img{
        max-width: 300px;
        height: auto;
    }
}
</style>