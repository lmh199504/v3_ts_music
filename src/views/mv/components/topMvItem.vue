<template>
    <div class="top_item" @click="tapMv">
        <div class="cover">
            <img :src="mvData.cover + '?param=200y200'" alt="">
        </div>
        <div class="info">
            <div class="number">{{ index + 1 }}</div>
            <div>
                <div class="name">{{ mvData.name }}</div>
                <div class="artistName">{{ mvData.artistName }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useRouter } from 'vue-router'
	import type { MvInterface } from '@/types/public/mv'
	interface Props{
		mvData: MvInterface,
        index: number
	}
	const router = useRouter()
	const props = withDefaults(defineProps<Props>(), {
		mvData: () => { return{
			id: 0,
			cover: '',
			name: '',
			playCount: 0,
			artistName: '',
			artistId: 0
		} },
        index: 0
	})
	function tapMv() {
		router.push({
			path: '/videoDetail',
			query: {
				id: props.mvData.id,
				type: 'MV'
			}
		})
	}
</script>
<style scoped lang="less">
    .top_item{
        margin-top: 30px;
        .cover{
            width: 100%;
            height: 320px;
            border-radius: 20px;
            img{
                border-radius: 20px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .info{
            display: flex;
            margin-top: 20px;
            align-items: center;
            .number{
                font-size: 50px;
                font-weight: bold;
                color: var(--my-primary-color);
                margin-right: 20px;
            }
            .name{
                font-size: 30px;
                font-weight: bold;
            }
            .artistName{
                font-size: 24px;
                margin-top: 5px;
                color: var(--my-text-color-gray);
            }
        }
    }
</style>