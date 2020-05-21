<template>
	<div class="goods-info">
		<!--加入购物车的那个小球-->
		<transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
			<div class="ball" v-show="ballshow" ref="ball"></div>
		</transition>
		
		
		<!--商品轮播图区域-->
		<div class="mui-card">
			<mt-swipe :auto="4000" >
			  <mt-swipe-item v-for="item in getListLunbo" :key="item.url">
				  <img :src="item.img" alt="">
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		
		<!--商品购买区域-->
		
		<div class="mui-card" v-for="item in getGoodsInfo" v-bind:key="item.title">
			<div class="mui-card-header" >{{item.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="goodsInfoPrice" >
						市场价：<span class="oldprice">¥{{item.market_price}} &nbsp;</span>
						销售价：<span class="newprice">¥{{item.sell_price}}</span>
					</p>
					<p class="sell">
					<span class="sellNumber">购买数量：<getgoodsnumber></getgoodsnumber>
					</span>
					</p>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger"  size="small" v-on:click="ballremove()">加入购物车</mt-button>
				</div>
			</div>
		</div>
		
		<!--商品参数区域-->
		<div class="mui-card" v-for="item in getGoodsInfo" v-bind:key="item.id">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>货品货号：{{item.goods_no}}</p>
					<p>库存情况：{{item.stock_quantity}}件</p>
					<p>上架时间：{{item.add_time | dataFilter}}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain v-on:click="goDesc(id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain v-on:click="goComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	//导入提示框的组件
	import { Toast } from 'mint-ui';
	import getgoodsnumber from "./goodsnumber.vue"
	
	export default{
		data:function(){
			return {
				id:this.$route.params.id,  //获取到地址栏id数据
				getListLunbo:[] ,  //保存轮播图的数据
				getGoodsInfo:[] ,//获取到的商品详情
				ballshow:false ,//记录小球是否展示出来的变量
			}
		},
		created(){
			this.getLunbotu();
			this.GoodsInfo();
		},
		methods:{
			//轮播图的方法
			getLunbotu(){
				//获取轮播图
				this.$http.get("api/getthumimages/"+this.id).then((result) => {
					//判断:如果状态码是0,那么就是成功的，成功就把请求成功的数据发送到data中去。如果不成功，就弹框出来
					if (result.data.status === 0) {
						result.data.message.forEach(result => {
							result.img=result.src;
						})
						this.getListLunbo = result.data.message;
					} else{
						Toast('请求失败，请重试');
					}
				})
			},
			//商品购买区域
			GoodsInfo(){
				this.$http.get("api/goods/getinfo/"+this.id).then(result => {
					if (result.body.status === 0) {
						this.getGoodsInfo=result.body.message;
					} else{
						Toast('请求失败，请重试');
					}
				})
			},
			//图文介绍函数
			goDesc(id){
				//使用编程氏导航
				this.$router.push({ name: 'goodsintroduce', params: {id}})
			},
			//前往评论函数
			goComment(id){
				this.$router.push({name:"goodscomment",params:{id}})
			},
			//点击加入购物车，小球显示或者隐藏的函数
			ballremove(){
				this.ballshow=!this.ballshow
			},
			//小球的半场动画函数
			beforeEnter(el){
				//小球最开始的位置
				el.style.transform="translate(0px,0px)";
			},
			enter(el,done){
				el.offsetWidth;
				//获取到小球,获取到购物车的那个徽标
				var ballPosition=this.$refs.ball.getBoundingClientRect()
				//var iconPosition=.getBoundingClientRect()
				var iconPosition=document.getElementById("badge").getBoundingClientRect()
				var conversionX=iconPosition.left-ballPosition.left
				var conversionY=iconPosition.top-ballPosition.top
				//console.log(conversionX,conversionY) //41,236.3333740234375
				
				//字符串的拼接，使用反引号
				el.style.transform=`translate(${conversionX}px,${conversionY}px)`;
				el.style.transition="all 0.4s ease";
				done();
			},
			afterEnter(){
				this.ballshow=!this.ballshow;
			}
		},
		components:{
			getgoodsnumber
		}
	}
</script>

<style scss="lang" scoped>
	.goods-info{
		background-color: #EEEEEE;
		overflow: hidden;
	}
	img{
		height: 100%;
		width: auto;
	}
	.mint-swipe{
		height: 200px;
	}
	.mint-swipe-item{
		text-align: center;
	}
	.newprice{
		font-size: 16px;
		font-weight: bold;
		color: red;
	}
	.mui-numbox{
		width: 130px;
		height: 28px;
	}
	.oldprice{
		text-decoration: line-through;
	}
	.mui-card-footer{
		display: block;
	}
	.mui-card-footer button{
		margin-bottom: 15px;
	}
	.goods-info .ball{
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: red;
		position: absolute;
		z-index: 99999;
		top: 384px;
		left: 196px;
	}
</style>
