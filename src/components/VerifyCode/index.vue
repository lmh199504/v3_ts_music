<template>
	<div class="code_wrapper">
		<div class="split_code">
			<ul>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		<input class="input" type="text">
	</div>
</template>

<script setup lang="ts">
	
</script>

<style scoped lang="less">
	.code_wrapper{
		position: relative;
		.input{
			left: 0;
			top: 0;
			position: absolute;
			opacity: 0;
			z-index: 1;
			width: 100%;
			height: 100%;
		}
		.split_code{
			padding: 30px;
			ul{
				display: flex;
				justify-content: space-between;
				li{
					width: 100px;
					height: 100px;
					border-bottom: 1px solid #e0e0e0;
				}
			}
		}
	}
</style>