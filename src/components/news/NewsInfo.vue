<template>
	<div class="newsinfo-container">
		<!--标题-->
		<h1 class="title">{{ newsList.title }}</h1>
		
		<!--发表时间和点击次数-->
		<p class="subtite">
			<span >发表时间：{{ newsList.add_time | dataFilter}}</span>
			<span >点击{{ newsList.click }}次</span>
		</p>
		
		<hr />
		
		<!--内容-->
		<div class="content" v-html="newsList.content"></div>
		
		<!--评论区域，明确父子组件之间的传值-->
		<comment v-bind:commentId="id"></comment>
	</div>
</template>

<script>
	//引入发表评论的组件
	import comment from "../subcomponent/comment.vue"
	
	import { Toast } from 'mint-ui';
	
	export default{
		data:function(){
			return {
				id:this.$route.params.id,   //讲url传递过来的参数ID值，挂载到data上面，方便之后使用
				newsList:{}   //如果请求成功，直接把请求到的数据对象放到自定义的对象中去
			}
		},
		created(){
			this.getNewsInfo()
		},
		methods:{
			//获取新闻详细页面
			getNewsInfo(){
				//注意：字符串的拼接
				this.$http.get('api/getnew/'+this.id).then(result => {
					if (result.body.status === 0) {
						this.newsList=result.body.message[0]
					} else{
						//发送get请求失败
						Toast("请重试！发送请求失败");
					}
				})
			}
		},
		//注册评论组件
		components:{
			comment
		}
	}
</script>

<style scss="lang" scoped>
	.newsinfo-container{
		padding: 0px 4px;
	}
	.title{
		font-size: 16px;
		margin: 15px 0px ;
		text-align: center;
		color: red;
	}
	.subtite{
		font-size: 13px;
		color: #226aff;
		display: flex;
		justify-content: space-between;
	}
	.content{
		
	}
</style>
