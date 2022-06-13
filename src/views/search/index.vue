<template>
	<MiniPlayOut>
		<div class="search">
			<van-sticky offset-top="0">
				<div class="top_search">
					<div class="left flex_box_center_column" @click="onClickLeft">
						<van-icon name="arrow-left" />
					</div>
					<div class="center">
						<div class="search_wrapper">
							<input type="text" v-model="keyWord" :placeholder="defaultPlaceholder" @input="onFocus">
							<div class="close flex_box_center_column" @click="clearKeyWord" v-show="showClose">
								<van-icon name="cross" size="14px" />
							</div>
						</div>
					</div>
					<div class="right flex_box_center_column">搜索</div>
				</div>
			</van-sticky>
			<div class="showSuggest" v-if="showSuggest">
				<van-cell-group>
					<van-cell :title="item.keyword" is-link v-for="(item, index) in suggestList" :key="index"
						@click="tapSuggest(item)">
						<template #right-icon>
							<van-icon name="search" class="search-icon" />
						</template>
					</van-cell>
				</van-cell-group>
				<van-empty description="没有结果" v-if="suggestList.length == 0" />
			</div>
			<SuggestResult v-if="showResult" :keyword="keyWord" />
			<div v-if="showDefault">
				<div class="history_container">
					<div class="history_title">历史搜索</div>
					<div class="history_item"></div>
				</div>
				<div class="hot_search">
					<div class="hot_title">热门搜索</div>
					<div class="hot_item" v-for="(item, index) in hotList" :key="index" @click="tapHot(item.first)">{{ item.first }}</div>
				</div>
			</div>
		</div>
	</MiniPlayOut>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue'
	import {
		onClickLeft
	} from '@/utils/back'
	import {
		reqSearchDefault,
		reqSearchSuggest, reqHotSearch
	} from '@/api/search'
	import SuggestResult from './components/suggestResult.vue'
	
	const defaultPlaceholder = ref < string > ('')
	const showClose = ref < boolean > (false)
	const keyWord = ref < string > ('')
	const suggestList = ref([])
	const showSuggest = ref < boolean > (false)
	const showResult = ref<boolean>(false)
	const showDefault = ref<boolean>(true)
	interface HotItem{
		first: string;
	}
	const hotList = ref<Array<HotItem>>([])
	
	let timer = null
	// 获取默认搜索关键词
	function getSearchDefault() {
		reqSearchDefault()
			.then(res => {
				defaultPlaceholder.value = res.data.data.showKeyword
			})
	}
	// 输入
	function onFocus() {
		if (keyWord.value) {
			showClose.value = true
			showSuggest.value = true
			showDefault.value = false
			showResult.value = false
			searchByKeyWord()
		} else {
			showClose.value = false
			showSuggest.value = false
		}
		showResult.value = false
	}
	// 清空
	function clearKeyWord() {
		keyWord.value = ''
		showDefault.value = true
		showClose.value = false
		showSuggest.value = false
		showResult.value = false
	}
	// 搜索提示
	function searchByKeyWord() {
		clearTimeout(timer)
		timer = setTimeout(() => {
			if (keyWord.value) {
				reqSearchSuggest({
						keywords: keyWord.value,
						type: 'mobile'
					})
					.then(res => {
						suggestList.value = res.data.result.allMatch || []
					})
			}
		}, 500)
	}
	// 点击搜索提示
	function tapSuggest() {
		showSuggest.value = false
		showResult.value = true
	}
	function getHot() {
		reqHotSearch()
		.then(res => {
			hotList.value = res.data.result.hots
		})
	}
	// 点击热门
	function tapHot(word: string) {
		keyWord.value = word
		showClose.value = true
		showResult.value = true
		showDefault.value = false
		showSuggest.value = false
	}
	getSearchDefault()
	getHot()
</script>
<style scoped lang="less">
	.search {
		height: 100%;

		.top_search {
			display: flex;
			background-color: var(--my-back-color-white);
			padding: 0 10px;
			box-shadow: 0 0 20px 0 rgba(136, 137, 140, .33);
			height: 90px;
			box-sizing: border-box;

			.left {
				font-size: 40px;
			}

			.center {
				flex: 1;
				padding: 15px;

				.search_wrapper {
					background: var(--my-back-color-gray);
					width: 100%;
					height: 100%;
					border-radius: 40px;
					padding: 0 20px;
					box-sizing: border-box;
					display: flex;
					align-items: center;

					input {
						display: block;
						width: 100%;
						height: 100%;
						border: none;
						outline: none;
						background-color: transparent;
						font-size: 28px;
					}

					.close {
						width: 40px;
						height: 40px;
						background-color: var(--my-back-color-white);
						border-radius: 50%;

						:deep(.van-icon) {
							color: var(--my-text-color-gray);
						}
					}
				}
			}

			.right {
				font-size: 30px;
				padding: 0 10px;

				&:active {
					opacity: 0.7;
			}
				}
		}
	}

	.suggest {
		position: relative;
		top: 100px;
		left: 0;
		height: calc(100% - 100px);
		width: 100%;
		background: var(--my-back-color-white);
	}
	.hot_search{
		padding: 30px;
		display: flex;
		flex-wrap: wrap;
		font-size: 30px;
		.hot_title{
			margin: 10px;
			padding: 10px;
			color: var(--my-text-color-black);
			font-weight: bold;
		}
		.hot_item{
			margin: 10px;
			background: var(--my-back-color-gray);
			padding: 10px;
			border-radius: 30px;
			color: var(--my-text-color-black);
		}
	}
	.history_container{
		padding: 30px;
	}
</style>
