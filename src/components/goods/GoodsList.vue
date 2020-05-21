<template>
	<div class="goods-list">
		<!--
		<router-link class="goods-item" v-for="item in goodsList" v-bind:key="item.id" v-bind:to="'/home/goodsinfo/'+item.id" tag="div">
			<img v-lazy="item.img_url" />
			<h3 class="goods-title">{{item.title}}</h3>
			<div class="goods-info">
				<p class="price">
					<span class="now">¥{{item.sell_price}}</span>
					<span class="old">{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩余{{item.stock_quantity}}件</span>
				</p>
			</div>
		</router-link>
		-->
		
		<router-link class="goods-item" v-for="item in goodsList" v-bind:key="item.id" v-bind:to="'/home/goodsinfo/'+item.id" tag="div">
			<img v-lazy="item.img_url" />
			<h3 class="goods-title">{{item.title}}</h3>
			<div class="goods-info">
				<p class="price">
					<span class="now">¥{{item.sell_price}}</span>
					<span class="old">{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩余{{item.stock_quantity}}件</span>
				</p>
			</div>
		</router-link>
		<mt-button type="danger" size="large" v-on:click="findPageindex()" >加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	
	export default{
		data:function(){
			return{
				//最开始的页数等于0
				pageindex:1,
				//把拿到的数据放到这个心定义的数组中
				goodsList:[]
			}
		},
		created(){
			this.getGoodsList()
		},
		methods:{
			//获取到商品列表的函数
			getGoodsList(){
				this.$http.get("api/getgoods?pageindex="+this.pageindex).then(result => {
					if (result.body.status === 0) {
						this.goodsList=this.goodsList.concat(result.body.message)
					} else{
						Toast('请求失败，请重试');
					}
				})
			},
			//点击加载更多评论
			findPageindex(){
				this.pageindex=this.pageindex+1;
				if (this.pageindex >= 3) {
					Toast('系统正在持续更新中');
				}else{
					this.getGoodsList()
				}
			}
		}
	}
</script>

<style scss="lang" scoped>
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		padding:7px;
		justify-content: space-between;
	}
	.goods-item{
		width: 49%;
		border: 1px solid #CCCCCC;
		margin-bottom: 10px;
		box-shadow: 0 0 8px #CCCCCC;
		padding: 2px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 293px;
	}
	.goods-item img{
		width: 100%;
	}
	.goods-item .goods-title{
		font-size: 14px;
	}
	.goods-item .goods-info{
		background-color: #EEEEEE;
		padding-bottom: 0px;
	}
	.goods-item .goods-info .price{
		margin: 0px;
		padding-bottom: 5px;
	}
	.goods-item .goods-info .price .now{
		color: red;
		font-weight: bold;
		font-size: 16px;
		padding-left: 10px;
	}
	.goods-item .goods-info .price .old{
		text-decoration: line-through;
		font-size: 12px;
		margin-left: 10px;
	}
	.goods-item .goods-info .sell{
		margin-bottom: 0px;
		display: flex;
		justify-content: space-between;
	}
</style>
