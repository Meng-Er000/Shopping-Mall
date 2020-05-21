<template>
	<div class="cmt-comment">
		<h3>发表评论</h3>
		<hr />
		<textarea placeholder="请输入要BB的内容(最多BB120个字)" maxlength="120" v-model="message"></textarea>
		<mt-button type="primary" size="large" v-on:click="postComment()">发表评论</mt-button>
		
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item,i) in commentsList" v-bind:key="item.add_time">
				<div class="cmt-title">
					第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{item.add_time | dataFilter}}
				</div>
				<div class="cmt-body">{{item.content === "underfined" ? "此用户没有填写任何评论":item.content}}</div>
			</div>
		</div>
		
		<mt-button type="danger" size="large" plain v-on:click="findPageindex()">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	
	export default{
		data:function(){
			return{
				pageindex:1,  //定义一个页面数，初始值是1
				commentsList:[]  ,//定义一个装评论数据的数组
				message:""   //定义一个发表评论的数据
			}
		},
		created(){
			this.getComment()
		},
		methods:{
			//获取评论
			getComment(){
				this.$http.get("api/getcomments/"+this.$route.params.id+"?pageindex="+this.pageindex).then(result => {
					if (result.body.status === 0) {
						//这样为了，每次点击加载更多的时候，新数据不会吧老数据覆盖掉。老数据还是存在的
						//concat() 方法用于连接两个或多个数组。
						this.commentsList=this.commentsList.concat(result.body.message)
					} else{
						//发送get请求失败
						Toast("请重试！发送请求失败");
					}
				})
			},
			//点击加载更多评论
			findPageindex(){
				this.pageindex=this.pageindex+1;
				this.getComment()
			},
			//发表评论的函数
			postComment(){
				//校验，店家发表评论不为空
				if (this.message.length==0) {
					Toast("发表内容不能为空");
				}
				//发送post请求，把数据添加到服务器上面
				this.$http.post("api/postcomment/"+this.$route.params.id,{content:this.message},{emulateJSON:true}).then(result => {
					if (result.body.status === 0) {
						//拼接一个对象
						var com={
							user_name:"匿名用户",
							add_time:Date.now(),
							content:this.message
						}
						//把新添加的数据添加到上面自定义的数组中
						this.commentsList.unshift(com)
						//清空评论框中的内容
						this.message=""
					} else{
						Toast("请重试！发送请求失败");
					}
				})
				
			}
		},
		//定义一下父子组件之间传值的数据
		props:["commentId"]
	}
</script>

<style scss="lang" scoped>
	h3{
		font-size: 18px;
	}
	textarea{
		font-size: 14px;
		height: 85px;
		margin-bottom: 0px;
	}
	.cmt-list{
		margin: 3px 0px;
	}
	.cmt-item{
		font-size: 13px;
	}
	.cmt-title{
		background-color: #CCCCCC;
		height: 30px;
		line-height: 30px;
	}
	.cmt-body{
		height: 35px;
		line-height: 35px;
		text-indent: 20px;
	}
</style>
