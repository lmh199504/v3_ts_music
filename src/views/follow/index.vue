<template>
	<div class="follow">
		<van-nav-bar fixed placeholder title="关注朋友圈" />
		<div class="list">
			<van-list :loading="loading" :finished="finished" @load="onLoad" finished-text="到底了~">
				<EventItem v-for="item in list" :key="item.id" :event-data="item" />
				<van-empty v-if="!loading && list.length == 0" />
			</van-list>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqEvent } from '@/api/event'
import EventItem from '@/components/EventCom/eventItem.vue'
import type { EventDataInterface } from '@/types/public/event'

const loading = ref<boolean>(true)
const finished = ref<boolean>(false)
const list = ref<EventDataInterface[]>([])
let lasttime = -1 // 用这个参数去翻页
function onLoad() {
	getList()
}
function getList() {
	loading.value = true
	reqEvent({
		pagesize: 20,
		lasttime: lasttime
	})
	.then(res => {
		list.value = list.value.concat(res.data.event)
		loading.value = false
		lasttime = res.data.lasttime
		finished.value = !res.data.more
	})
	.catch(() => {
		loading.value = false
		finished.value = true
	})
}
</script>

<style scoped lang="less">
.follow{
	height: 100%;
	overflow: auto;
	padding-bottom: 180px;
	box-sizing: border-box;
	background-color: var(--my-back-color-white);
	.list{
		padding: 30px;
	}
}
</style>