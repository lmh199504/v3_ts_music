<template>
  <MiniPlayOut>
    <div class="cloudDisk">
      <van-nav-bar
        title="我的云盘"
        fixed
        placeholder
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
      <van-list :loading="loading" :finished="finished" @load="onLoad">
        <div class="list">
          <div class="top_menu">
            <div class="play_btn" @click="playAll">
              <i class="iconfont icon-bofang1"></i>
              <div>播放全部</div>
            </div>
          </div>
          <CloudItem
            v-for="(item, index) in list"
            :key="item.songId"
            :song-data="item.simpleSong"
            :song-id="item.songId"
            :index="index + 1"
            @reload="reload"
            >{{ item.simpleSong.name }}</CloudItem
          >
        </div>
      </van-list>
    </div>
    <UploadMusic @success="reload" />
  </MiniPlayOut>
</template>
<script lang="ts" setup>
import { ref, toRaw } from "vue";
import { onClickLeft } from "@/utils/back";
import { reqCloudMusic } from "@/api/user";
import type { CloudDiskItem } from "@/types/public/cloudDisk";
import CloudItem from "./components/cloudDisk/cloudItem.vue";
import { usePlayerStore } from "@/store";
import UploadMusic from "./components/cloudDisk/uploadMusic.vue";

const playerStore = usePlayerStore();
const loading = ref<boolean>(true);
const finished = ref<boolean>(false);
const list = ref<CloudDiskItem[]>([]);
const limit = 30;
let offset = 0;

function getList() {
  const params = {
    limit: limit,
    offset: offset * limit,
    timestamp: Date.now(),
  };
  loading.value = true;
  reqCloudMusic(params)
    .then((res) => {
      list.value = list.value.concat(res.data.data);
      finished.value = !res.data.hasMore;
    })
    .finally(() => {
      loading.value = false;
    });
}
function onLoad() {
  offset++;
  getList();
}

function reload() {
  offset = 0;
  list.value = [];
  getList();
}

function playAll() {
  const play_list = list.value.map((item) => toRaw(item.simpleSong));
  playerStore.resetList(play_list, true);
}
getList();
</script>
<style scoped lang="less">
.cloudDisk {
  height: 100%;
  overflow: auto;
}
.top_menu {
  display: flex;
  justify-content: space-between;
  padding: 30px;
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
