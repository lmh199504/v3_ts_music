<template>
    <div class="cloudItem">
        <div class="left">
            {{ index }}
        </div>
        <div class="center">
            <div class="song-name">{{ songData.name }}</div>
            <div class="singer">{{ songData.al.name }}</div>
        </div>
        <div class="right">
            <i class="iconfont icon-24gf-play" @click="playThis"></i>
			<i class="iconfont icon-Androidgengduo" @click="showShareMenu"></i>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { toRaw, ref } from 'vue'
    import { usePlayerStore } from '@/store'
    import type { SongData } from '@/types/store/player'
    interface Props{
        songData: SongData
        index: number
        songId: number
    }
    const show = ref<boolean>(false)
    const playerStore = usePlayerStore()
    const props = withDefaults(defineProps<Props>(), {
        index: 0,
        songData: () => {
            return {
                url: '',
                name: '',
                id: 0,
                ar: [],
                al: {
                    id: 0,
                    name: '',
                    pic: 0,
                    picUrl: '',
                    pic_str: ''
                },
                dt: 0
            }
        }
    })
    function showShareMenu() {
		show.value = true
	}
	function playThis() {
        console.log('sdfasdfasd')
        const data = toRaw(props.songData)
        data.id = toRaw(props.songId)
        console.log(data)
		playerStore.setCurSong(data)
	}
</script>
<style scoped lang="less">
    .cloudItem{
        width: 100%;
        display: flex;
        overflow: hidden;
        align-items: center;
        box-sizing: border-box;
        padding: 10px 30px;
        .left{
            font-size: 40px;
            margin-right: 30px;
        }
        .center{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			.song-name{
				font-size: 26px;
				color: var(--my-text-color-black);
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 450px;
				white-space: nowrap;
			}
			.singer{
				color: var(--my-text-color-gray);
				font-size: 24px;
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 450px;
				white-space: nowrap;
			}
		}
		.right{
			.iconfont{
				color: var(--my-text-color-gray);
				padding-left: 20px;
				font-size: 28px;
			}
		}
    }
</style>