<template>
	<div class="bottom-bar">
		<div class="chat">
			<span>客服</span>
		</div>
		<div class="收藏"></div>
		<div class="cart">加入购物车</div>
		<div class="buy">立即购买</div>
	</div>
</template>

<script>
	export default {
		name: "DetailBottomBar",
	}
</script>

<style scoped>
.bottom-bar{
	height: 50px;
	width: 100%;
	background-color: #BBFFAA;
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 10;
	display: flex;
	text-align: center;
}

.chat{
	width: 45px;
	background: url('~assets/img/detail/detail_bottom.png');
	background-position:0px 195px;
}
</style>
