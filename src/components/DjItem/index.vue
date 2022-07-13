<template>
	<div v-if="boxType == BoxType.box" class="dj_item" @click="getDetail">
		<div class="cover">
			<div class="cover_img">
				<img :src="djData.picUrl + '?param=140y140'" alt="">
			</div>
			<div class="feeScope" v-if="djData.feeScope == 0">免费</div>
			<div class="play_count">
				<i class="iconfont icon-bofang"></i>
				<div>{{ formatCountNumber(djData.playCount) }}</div>
			</div>
		</div>
		<div class="info text_over_two_lines"><span class="name">{{ djData.name }} </span></div>
	</div>
	<div v-else class="dj_item_line" @click="getDetail">
		<div class="left">
			<img :src="djData.picUrl" alt="">
		</div>
		<div class="right">
			<div class="dj_name">{{ djData.name }}</div>
			<div class="dj_info">
				<div class="rcmdText text_over_line">{{ djData.rcmdText }}</div>
				<div class="count">
					<i class="iconfont icon-bofang"></i>
					{{ djData.playCount }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { formatCountNumber } from '@/utils'
import type { DjData } from '@/types/public/dj'
import { BoxType } from '@/types/public'
import { useRouter } from 'vue-router'

const router = useRouter()
interface Props {
	djData: DjData,
	boxType: BoxType
}

const props = withDefaults(defineProps<Props>(), {
	djData: () => {
		return {
			id: 0,
			rcmdText: '',
			subed: false,
			programCount: 0,
			picUrl: '',
			name: '',
			playCount: 0,
			feeScope: 0
		}
	},
	boxType: BoxType.box
})
const getDetail = () => {
	router.push({
		path: '/djDetail',
		query: {
			id: props.djData.id
		}
	})
}
</script>

<style scoped lang="less">
.dj_item {
	box-sizing: border-box;
	margin-bottom: 20px;

	&:first-child {
		padding-right: 10px;
	}

	&:active {
		opacity: 0.8;
	}

	.cover {
		position: relative;
		width: 100%;
		padding-bottom: 100%;
		border-radius: 10px;
		overflow: hidden;

		.cover_img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.feeScope {
			position: absolute;
			top: 10px;
			left: 10px;
			font-size: 20px;
			background-color: var(--my-color-oranger);
			color: var(--my-text-color-white);
			padding: 5px;
			border-radius: 20px;
		}

		.play_count {
			position: absolute;
			top: 15px;
			right: 10px;
			color: var(--my-text-color-white);
			font-size: 28px;
			background: rgba(0, 0, 0, 0.2);
			padding: 2px 5px;
			border-radius: 8px;
			display: flex;
			align-items: center;

			.iconfont {
				margin-right: 5px;
			}
		}
	}

	.info {
		margin-top: 20px;
		font-size: 24px;
		min-height: 60px;

		.name {
			color: var(--my-text-color-black);
		}
	}
}

.dj_item_line {
	display: flex;
	width: 100%;
	margin-bottom: 20px;

	&:active {
		opacity: 0.8;
	}

	.left {
		width: 150px;
		height: 150px;
		flex-shrink: 0;
		border-radius: 10px;
		margin-right: 20px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;

		.dj_name {
			color: var(--my-text-color-black);
			font-size: 28px;
			font-weight: bold;
		}

		.dj_info {
			font-size: 24px;
			color: var(--my-text-color-gray);

			.rcmdText {
				margin: 10px 0;
			}
		}
	}
}
</style>
