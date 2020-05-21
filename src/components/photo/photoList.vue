<template>
	<div>
		<!--顶部滑动区域-->
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a v-bind:class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" v-bind:key="item.id" v-on:click="getPhotoById(item.id)">{{ item.title }}</a>
				</div>
			</div>
		</div>
		
		<!--实现懒加载-->
		<ul class="photo-list">
		  <router-link v-for="item in list" v-bind:key="item.id" v-bind:to="'/home/getimageInfo/'+item.id" tag="li">
		    <img v-lazy="item.img_url">
			<div class="info">
				<h1 class="info-title">{{item.title}}</h1>
				<div class="info-zhaiyao" v-html="item.zhaiyao"></div>
			</div>
		  </router-link>
		</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import mui from "../../lib/mui-master/dist/js/mui.js"
	
	export default{
		data:function(){
			return{
				cates:[],   //存放图片列表的数组
				list:[]   //存放图片的数组
			}
		},
		created(){
			this.getList(),
			//最开始没有点击任何超链接的时候。初始化加载全部图片
			this.getPhotoById(0)
		},
		mounted(){   //当组件中的DOM结构渲染好之后并放到页面中去的时候，就会执行这个钩子函数
			//初始化滑动事件
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		methods:{
			getList(){
				this.$http.get("api/getimgcategory").then(result => {
					if (result.body.status === 0) {
						result.body.message.unshift({title:"全部", id:0})
						this.cates=result.body.message
					} else{
						Toast('请求失败，请重试');
					}
				})
			},
			//加载图片的函数
			getPhotoById(cateId){
				this.$http.get("api/getimages/"+cateId).then(result => {
					if (result.body.status === 0) {
						this.list=result.body.message
					} else{
						Toast('请求失败，请重试');
					}
				})
			}
		}
	}
</script>

<style scss="lang" scoped>
	/*CSS属性 touch-action 用于设置触摸屏用户如何操纵元素的区域(例如，浏览器内置的缩放功能)。*/
	*{
		touch-action:pan-y
	}
	img[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
	.photo-list{
		list-style: none;
		margin: 0;
		padding: 10px;
		padding-bottom: 0px;
	}
	.photo-list li{
		margin-bottom: 10px;
		background-color: #CCCCCC;
		box-shadow: 0 0 9px #999999;
		position: relative;
	}
	.photo-list img{
		width: 100%;
		vertical-align: middle;
	}
	.info{
		color: #FFFFFF;
		position: absolute;
		text-align: left;
		bottom: 0px;
		background-color: rgba(0,0,0,0.4);
		max-height: 90px;
	}
	.info-title{
		font-size: 14px;
	}
	.info-zhaiyao{
		font-size: 13px;
	}
</style>
