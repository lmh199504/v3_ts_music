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
					<div class="right flex_box_center_column" @click="handleSearch">搜索</div>
				</div>
			</van-sticky>
			<div class="showSuggest" v-if="showSuggest">
				<div v-if="suggestLoading" class="flex_box_center_column" style="height: 60vh;">
					<van-loading color="#e20001" />
				</div>
				<van-cell-group v-if="!suggestLoading">
					<van-cell :title="item.keyword" is-link v-for="(item, index) in suggestList" :key="index"
						@click="tapSuggest(item.keyword)">
						<template #right-icon>
							<van-icon name="search" class="search-icon" />
						</template>
					</van-cell>
				</van-cell-group>
				<van-empty description="没有结果" v-if="suggestList.length == 0 && !suggestLoading" />
			</div>
			<SuggestResult v-if="showResult" :keyword="keyWord" />
			<div v-if="showDefault">
				<div class="history_container">
					<div class="history_title">
						<div>历史搜索</div>
						<div>
							<van-icon name="delete-o" @click="clearHistory" />
						</div>
					</div>
					<div class="history_list">
						<div class="history_item" v-for="(item, index) in historyList" :key="index"
							@click="tapHot(item)">{{ item }}</div>
					</div>
				</div>
				<div class="hot_search">
					<div class="hot_title">热门搜索</div>
					<div class="hot_item" v-for="(item, index) in hotList" :key="index" @click="tapHot(item.first)">
						{{ item.first }}</div>
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
		reqSearchSuggest,
		reqHotSearch
	} from '@/api/search'
	import SuggestResult from './components/suggestResult.vue'
	import Cookies from 'js-cookie'

	interface SuggestList{
		keyword: string
	}
	const LOCAL_KEY = 'historySearch'
	const defaultPlaceholder = ref < string > ('')
	const showClose = ref < boolean > (false)
	const keyWord = ref < string > ('')
	const suggestList = ref<SuggestList[]>([])
	const showSuggest = ref < boolean > (false)
	const suggestLoading = ref < boolean > (false)
	const showResult = ref < boolean > (false)
	const showDefault = ref < boolean > (true)
	interface HotItem {
		first: string;
	}
	const hotList = ref < Array < HotItem >> ([])
	const localHistory = (Cookies.get(LOCAL_KEY) && JSON.parse(Cookies.get(LOCAL_KEY))) || []
	const historyList = ref < Array < string >> (localHistory)

	let timer: number| undefined = undefined
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
				suggestLoading.value = true
				reqSearchSuggest({
						keywords: keyWord.value,
						type: 'mobile'
					})
					.then(res => {
						suggestList.value = res.data.result.allMatch || []
					})
					.finally(() => {
						suggestLoading.value = false
					})
			}
		}, 500)
	}
	// 点击搜索提示
	function tapSuggest(val: string): void {
		showSuggest.value = false
		showResult.value = true
		keyWord.value = val
		pushHistoryList(keyWord.value)
	}

	function getHot() {
		reqHotSearch()
			.then(res => {
				hotList.value = res.data.result.hots
			})
	}
	// 点击热门
	function tapHot(word: string): void {
		keyWord.value = word
		showClose.value = true
		showResult.value = true
		showDefault.value = false
		showSuggest.value = false
		pushHistoryList(keyWord.value)
	}
	// 点击搜索
	function handleSearch() {
		if (keyWord.value) {
			tapHot(keyWord.value)
		} else {
			tapHot(defaultPlaceholder.value)
		}
	}
	// 清空历史
	function clearHistory() {
		historyList.value = []
		Cookies.remove(LOCAL_KEY)
	}

	function pushHistoryList(val: string) {
		const MAX_LENGTH = 5
		const index: number = historyList.value.findIndex((item: string): boolean => val === item)
		const isMax: boolean = historyList.value.length >= MAX_LENGTH
		if (isMax) { // 是否已达最大长度
			if (index === -1) { // 历史中没有
				historyList.value.splice(0, 1)
				historyList.value.push(val)
			} else {
				historyList.value.splice(index, 1)
				historyList.value.push(val)
			}
		} else {
			if (index === -1) { // 历史中没有
				historyList.value.push(val)
			} else {
				historyList.value.splice(index, 1)
				historyList.value.push(val)
			}
		}
		Cookies.set(LOCAL_KEY, JSON.stringify(historyList.value))
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

				:deep(.van-icon) {
					color: var(--my-text-color-black);
				}
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
				color: var(--my-text-color-black);
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

	.hot_search {
		padding: 30px;
		display: flex;
		flex-wrap: wrap;
		font-size: 30px;

		.hot_title {
			margin: 10px;
			padding: 10px;
			color: var(--my-text-color-black);
			font-weight: bold;
		}

		.hot_item {
			margin: 10px;
			background: var(--my-back-color-gray);
			padding: 10px;
			border-radius: 30px;
			color: var(--my-text-color-black);
		}
	}

	.history_container {
		padding: 30px;

		.history_title {
			display: flex;
			justify-content: space-between;
			font-size: 30px;
			padding: 10px;
			margin: 10px;
			color: var(--my-text-color-black);
		}

		.history_list {
			display: flex;
			flex-wrap: wrap;
		}

		.history_item {
			font-size: 30px;
			margin: 10px;
			background: var(--my-back-color-gray);
			padding: 10px;
			border-radius: 30px;
			color: var(--my-text-color-black);
		}
	}
</style>
