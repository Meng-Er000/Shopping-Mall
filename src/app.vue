<template>
	<div class="app-container">
		<!--这是顶部header-->
		<mt-header title="移动商品" fixed>
		  <router-link to="/" slot="left">
		    <mt-button icon="back" onclick="history.go(-1)">返回</mt-button>
		  </router-link>
		  <mt-button icon="more" slot="right" onclick="history.go(1)"></mt-button>
		</mt-header>
		
		
		
		<!--这是中间路由组件的部分,把路由放到过渡动画的这个标签中去。是为了有动画-->
		<transition>
		        <router-view></router-view>
		</transition>
		
		
		
		
		<!--这是尾部的部分-->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-fl" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-fl" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-fl" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart" ref="icon"><span class="mui-badge" id="badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-fl" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
		
	
	</div>
</template>


<script>
	
</script>


<style scss="lang" scoped>
	.app-container{
		padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;
	}
	.v-enter{
		opacity: 0;
		transform:translateX(100%);
	}
	.v-enter-active,
	.v-leave-active{
		transition: all 0.3s ease;
	}
	.v-leave{
		transform: translateX(-100%);
	}
	.mui-bar-tab .mui-tab-item-fl.mui-active {
	    color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-fl {
	    display: table-cell;
	    overflow: hidden;
	    width: 1%;
	    height: 50px;
	    text-align: center;
	    vertical-align: middle;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    color: #929292;
	}
	.mui-bar-tab .mui-tab-item-fl .mui-icon {
	    top: 3px;
	    width: 24px;
	    height: 24px;
	    padding-top: 0;
	    padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-fl .mui-icon ~ .mui-tab-label {
	    font-size: 11px;
	    display: block;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.mint-header{
		z-index: 10000;
	}
</style>