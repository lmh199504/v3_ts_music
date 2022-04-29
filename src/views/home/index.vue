<template>
	<div class="home">
		<div class="nav">
			<div class="flex_box_center_column" @click="openMenu">
				<i class="iconfont icon-caidan"></i>
			</div>
			<div class="search_wrapper">
				<div class="flex_box_center_column">
					<i class="iconfont icon-sousuo"></i>
				</div>
				<div class="search_text flex_box_center_column">古风</div>
			</div>
			<div class="flex_box_center_column">
				<i class="iconfont icon-yuyin"></i>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import $bus from '@/utils/eventBus'
	function openMenu(): void {
		$bus.emit('opne_menu')
	}
</script>

<style scoped lang="less">
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 20px;
		height: 88px;
		background: #e8e8e8;

		.search_wrapper {
			height: 60px;
			background: #fff;
			flex: 1;
			margin: 0 40px;
			display: flex;
			border-radius: 30px;
			display: flex;
			justify-content: center;

			.icon-sousuo {
				padding-top: 4px;
			}

			.search_text {
				margin-left: 10px;
				font-size: 24px;
			}
		}
	}

	.iconfont {
		font-size: 30px;
	}

	.icon-yuyin,
	.icon-caidan {
		font-size: 40px;
		color: #2e2e2e;
		font-weight: 600;
	}
</style>
