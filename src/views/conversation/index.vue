<template>
    <div class="conversation" :style="style">
        <MsgItem v-for="item in list" :key="item.id" :msg-data="item" />
    </div>
</template>
<script setup lang="ts">
import { reqPrivateHistory } from '@/api/msg'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { MsgData } from '@/types/public/msg'
import MsgItem from '@/components/msg/msgItem.vue'


const route = useRoute()
const uid = Number(route.query.id)
const list = ref<MsgData[]>([])
const style = {
    minHeight: window.innerHeight
}
function getHistory() {
    reqPrivateHistory({
        uid: uid,
        limit: 30
    })
    .then(res => {
        const msgs = res.data.msgs
        list.value = list.value.concat(msgs)
    })
}
getHistory()
</script>
<style scoped lang="less"></style>