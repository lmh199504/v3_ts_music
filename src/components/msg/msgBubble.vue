<template>
    <div class="message_bubble" :class="bubbleClass">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface Props {
    isMine: boolean,
    isCenter: boolean
}
const props = withDefaults(defineProps<Props>(), {
    isMine: false,
    isCenter: false
})

const bubbleClass = computed(() => {
    return props.isCenter ? 'bubble_center' : props.isMine ? 'bubble_right' : 'bubble_left'
})

</script>
<style scoped lang="less">
.message_bubble {
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 30px;
    min-width: 0;
    position: relative;
}

.bubble_right {
    background-color: var(--my-bubble-right-color);
    color: var(--my-text-color-white);
    margin-right: 20px;

    &::after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 15px solid var(--my-bubble-right-color);
        position: absolute;
        right: -15px;
        top: 50%;
        transform: translateY(-50%);
    }
}

.bubble_left {
    background-color: var(--my-back-color-white);
    margin-left: 20px;
    color: var(--my-text-color-black);
    &::before {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 15px solid var(--my-back-color-white);
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>