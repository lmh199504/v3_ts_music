<template>
    <div class="open_screen animate__animated" :class="{ animate__fadeOut: bounceOut }">
        <div class="circle" @click="tapClose">
            <van-circle 
                v-model:current-rate="currentRate" 
                :rate="rate" 
                layer-color="#ebedf0"
                color="#e20001"
                :text="text + ''" 
                fill="#fff"
                size="30px" 
                :speed="20"
                :clockwise="false"
            />
        </div>
        <div class="cover_img">
            <img src="@/assets/images/public/screen.jpg" alt="">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const bounceOut = ref<boolean>(false)
const emit = defineEmits<{
    (e: 'close'): void
}>()
const rate = ref<number>(100)
const currentRate = ref<number>(100)
const timer = setInterval(() => {
    if (!rate.value) {
        rate.value = 0
        tapClose()
    } else{
        rate.value = rate.value - 20
    }
}, 1000)
const text = computed(() => {
    return Math.ceil(rate.value / 20)
})

function tapClose() {
    clearInterval(timer)
    bounceOut.value = true
    setTimeout(() => {
        emit('close')
    }, 1000)
}
</script>
<style scoped lang="less">
.open_screen{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    .circle{
        position: absolute;
        top: 30px;
        right: 30px;
    }
    .cover_img{
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>