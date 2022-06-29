<template>
    <div class="video_detail">
        <div class="nav">
            <div class="left flex_box_center_column" @click="onClickLeft">
                <i class="iconfont icon-fanhui"></i>
            </div>
        </div>
        <swiper direction="vertical" @slide-change="slideChange">
            <swiper-slide v-for="(item, index) in list" :key="index">
                <PlayVideo :video-data="item.data" :index="index" :cur-index="curIndex" :type="item.type" />
            </swiper-slide>
        </swiper>
    </div>
</template>
<script setup lang="ts">
    import { onClickLeft } from '@/utils/back'
    import { usePlayerStore } from '@/store'
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { reqAllVideo, reqVideoDetail, reqMvDetail } from '@/api/video'
    import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js"
    import PlayVideo from './components/playVideo.vue'
	import "swiper/swiper.min.css";	

    const playerStore = usePlayerStore()
    interface ListData{
        type: number | string
        // eslint-disable-next-line
        data: any
    }
    
    const route = useRoute()
    const list = ref<ListData[]>([])
    const curIndex = ref<number>(-1)
    
    // eslint-disable-next-line
    function slideChange({ realIndex }: any) {
        curIndex.value = realIndex
		if (curIndex.value + 4 >= list.value.length) {
			getMore()
		}
    }
	async function getMore() {
		const res = await reqAllVideo({ timestamp: Date.now() })
		list.value = list.value.concat(res.data.datas.filter((item: ListData) => item.type == 1))
	}
	
    async function initPage() {
        const { id, type } = route.query
        if (id) {
            if (type == 'MLOG') {
                const detailVideo = await reqVideoDetail({ id: String(id)})
                list.value.push({
                    type: 1,
                    data: detailVideo.data.data
                })
            } else if (type == 'MV') {
                const mvData =  await reqMvDetail({ mvid: String(id) })
                list.value.push({
                    type: type,
                    data: mvData.data.data
                })
            } else {
                const detailVideo = await reqVideoDetail({ id: String(id)})
                list.value.push({
                    type: 1,
                    data: detailVideo.data.data
                })
            }
        }
		await getMore()
		curIndex.value = 0
        playerStore.setPlaying(false)
    }
    initPage()

</script>
<style scoped lang="less">
    .video_detail{
        height: 100vh;
        background: #000;
        .nav{
            position: fixed;
            background-color: transparent;
            color: #fff;
            height: 80px;
            padding: 0 30px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            z-index: 10;
            .left{
                height: 100%;
                .iconfont{
                    font-size: 40px;
                    font-weight: bold;
                }
            }
        }
        :deep(.swiper){
            height: 100%;
        }
        .paly{
            color: #fff;
        }
    }
</style>