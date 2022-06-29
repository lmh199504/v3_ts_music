<template>
    <MiniPlayOut>
        <div class="mv">
            <van-nav-bar title="MV排行" left-arrow fixed placeholder @click-left="onClickLeft" />
            <van-tabs v-model:active="active" sticky offset-top="1.22667rem">
				<van-tab :title="item" v-for="(item, index) in tags" :key="index" >
					<MvTop :title="item" />
				</van-tab>
			</van-tabs>
        </div>
    </MiniPlayOut>
</template>
<script setup lang="ts">
    import { onClickLeft } from '@/utils/back'
    import { ref } from 'vue'
    import MvTop from './components/mvTop.vue'

    const tags = ref<string[]>(['内地','港台','欧美','日本','韩国'])
    const active = ref<number>(0)
</script>
<style scoped lang="less">
    .mv{
        height: 100%;
		overflow: auto;
		padding: 15px;
		box-sizing: border-box;
    }
</style>