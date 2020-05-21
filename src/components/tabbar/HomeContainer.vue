<template>
	<div>
		<mt-swipe :auto="4000" >
		  <mt-swipe-item v-for="item in getListLunbo" :key="item.url">
			  <img :src="item.img" alt="">
		  </mt-swipe-item>
		</mt-swipe>
		
		 <ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
				<img src="../../images/menu1.png" alt="">
				<div class="mui-media-body">新闻资讯</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoList">
				<img src="../../images/menu2.png" alt="">
				<div class="mui-media-body">图片分享</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
				<img src="../../images/menu3.png" alt="">
				<div class="mui-media-body">商品购买</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				<img src="../../images/menu4.png" alt="">
				<div class="mui-media-body">留言反馈</div></a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				<img src="../../images/menu5.png" alt="">
				<div class="mui-media-body">视频专区</div></a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				<img src="../../images/menu6.png" alt="">
				<div class="mui-media-body">联系我们</div></a></li>
		</ul>
		
	</div>
</template>

<script>
	//导入提示框的组件
	import { Toast } from 'mint-ui';
	
	export default{
		data:function(){
			return {
				getListLunbo:[]   //保存轮播图的数据
			}
		},
		created(){
			this.getLunbotu();
		},
		methods:{
			//轮播图的方法
			getLunbotu(){
				//获取轮播图
				this.$http.get("api/getlunbo").then((result) => {
					//判断:如果状态码是0,那么就是成功的，成功就把请求成功的数据发送到data中去。如果不成功，就弹框出来
					if (result.data.status === 0) {
						//console.log(result)
						this.getListLunbo = result.data.message;
						//Toast('加载中');
						/*setTimeout(() => {
							Toast('加载成功');
						},1000);*/
					} else{
						Toast('请求失败，请重试');
					}
				})
			}
		}
	}
</script>

<style scss="lang" scoped>
	img{
		width: 100%;
		height: 100%;
	}
	.mint-swipe{
		height: 200px;
		
	}
	.mint-swipe-item:nth-child(1){
		background-color: lightblue;
	}
	.mint-swipe-item:nth-child(2){
		background-color: lightpink;
	}
	.mint-swipe-item:nth-child(3){
		background-color: lightgreen;
	}
	.mui-grid-view.mui-grid-9{
		background-color: #FFFFFF;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: 0px;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell img{
		width: 60px;
		height: 60px;
	}
	.mui-media-body{
		font-size: 13px;
	}
</style>
