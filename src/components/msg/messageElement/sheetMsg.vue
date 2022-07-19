<template>
    <div class="title">{{ title }}</div>
    <Sheet :song-list-data="sheetData" />
</template>
<script setup lang="ts">
import Sheet from '@/components/songListItem/index.vue'
import { computed } from 'vue'
interface Props{
    msg: string
}
const props = withDefaults(defineProps<Props>(), {
    msg: '{}'
})
console.log(JSON.parse(props.msg))
const sheetData = computed(() => {
    return JSON.parse(props.msg).playlist
})
const title = computed(() => {
    return JSON.parse(props.msg).title
})
</script>
<style scoped lang="less">
.title{
    margin-bottom: 10px;
}
</style>