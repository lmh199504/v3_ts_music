<!-- 头像 -->
<template>
    <div class="avatar" @click="tapAvatar">
        <img :src="avatarSrc" alt="">
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props{
    avatarUrl: string
}
const props = withDefaults(defineProps<Props>(), {
    avatarUrl: ''
})
const emit = defineEmits<{
	(e: 'tapAvatar'): void
}>()
const avatarSrc = computed(() => {
    if (/^(https:|http:|\/\/)/.test(props.avatarUrl)) {
        return props.avatarUrl
    } else {
        return require('@/assets/images/public/header.png')
    }
})
function tapAvatar() {
    emit('tapAvatar')
}

</script>
<style scoped lang="less">
.avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
}
</style>