<template>
    <div class="list">
        <div class="top_menu">
            <div class="play_btn" @click="playAll">
              <i class="iconfont icon-bofang1"></i>
              <div>播放全部</div>
            </div>
        </div>
        <SongItem v-for="item in list" :key="item.resourceId" :song-data="item.data" :showdel="false" />
        <van-empty v-if="list.length == 0"/>
    </div>
</template>
<script setup lang="ts">
    import { reqRecentSong } from '@/api/recent'
    import type { SongData } from '@/types/store/player'
    import SongItem from '@/components/songItem/index.vue'
    import { usePlayerStore } from '@/store'
    import { ref } from 'vue'
    import { Toast } from 'vant'

    const playerStore = usePlayerStore()
    interface ListItem{
        data: SongData
        resourceId: string
        playTime: string
        resourceType: string
    }
    const list = ref<ListItem[]>([])
    function getList() {
        const params = {
            limit: 300
        }
        const reqLoading = Toast.loading({
            duration: 0,
            message: '加载中',
            overlay: true
        })
        reqRecentSong(params)
        .then(res => {
            list.value = res.data.data.list
        })
        .finally(() => {
            reqLoading.clear()
        })
    }
    function playAll() {
        const play_list = list.value.map(item => item.data)
        playerStore.resetList(play_list, true)
    }
    getList()
</script>
<style scoped lang="less">
.list{
    padding: 30px;
}
.top_menu {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  .play_btn {
    display: flex;
    align-items: center;
    font-size: 28px;
    color: var(--my-text-color-black);
    .iconfont {
      margin-right: 10px;
      font-size: 36px;
      color: var(--my-primary-color);
    }
  }
}
</style>