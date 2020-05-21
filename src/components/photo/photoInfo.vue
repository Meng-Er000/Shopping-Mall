<template>
	<div class="photoinfo-div">
		<h3>{{ photoInfo.title }}</h3>
		<p class="photoinfo-div-title">
			<span>发表时间{{photoInfo.add_time | dataFilter}}</span>
			<span>点击{{photoInfo.click}}次</span>
		</p>
		
		<hr />
		<!--缩略图-->
		<div class="thumbs">
		    <vue-preview :slides="slide1" class="imgPrev" tag="img" ></vue-preview>
		</div>
		
		<!--内容区域-->
		<div class="content" v-html="photoInfo.content"></div>
		
		<!--放置一个全局的组件-->
		<comment v-bind:commentId="id"></comment>
	</div>
</template>

<script>
	import comment from "../subcomponent/comment.vue"
	import { Toast } from 'mint-ui';
	export default{
		data:function(){
			return{
				id:this.$route.params.id,
				photoInfo:{},   //保存图片详情的对象
				slide1:[]   //保存缩略图的数组
			}
		},
		created(){
			this.getPhotoInfo(),
			this.getThumbs()
		},
		methods:{
			//获取图片详情
			getPhotoInfo(){
				this.$http.get("api/getimageInfo/"+this.id).then(result => {
					if (result.body.status === 0) {
						this.photoInfo=result.body.message[0]
					} else{
						Toast('请求失败，请重试');
					}
				})
			},
			//获取到图片的缩略图
			getThumbs(){
				this.$http.get("api/getthumimages/"+this.id).then(result => {
					if (result.body.status === 0) {
						//循环每一项,给每一项都添加一个高宽
						result.body.message.forEach(item => {
							item.w=600;  //设置以大图浏览时的宽度
							item.h=400;  //设置以大图浏览时的高度
							item.msrc=item.src  //把小图的地址给大图
						});
						//然后把数据保存到slide1中去
						this.slide1=result.body.message;
					} else{
						Toast('获取图片失败，请重试');
					}
				})
			},
			handleClose () {
			    console.log('close event')
			}
		},
		//注册评论组件
		components:{
			comment
		}
	}
</script>

<style scss="lang" scoped>
	img{
		width: 20px;
		height: 30px;
	}
	.photoinfo-div{
		padding-top: 3px;
	}
	.photoinfo-div h3{
		font-size: 15px;
		color: #16A2ff;
		text-align: center;
		margin: 15px 0px;
	}
	.photoinfo-div-title {
		display: flex;
		justify-content:space-between;
		font-size: 13px;
	}
	.content{
		font-size: 13px;
		/*行高*/
		line-height: 30px;
	}
	.thumbs .imgPrev .my-gallery{
		display: flex;
		flex-wrap: wrap;
	}
	.thumbs .imgPrev .my-gallery figure{
		width: 30%;
		margin: 5px;
	}
	.thumbs .imgPrev .my-gallery figure a img{
		width: 100px;
		height: 100px;
	}
</style>
