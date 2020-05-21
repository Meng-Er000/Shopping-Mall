<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newsList" v-bind:key="item.id">
				<!--有关于到字符串的拼接，就一定需要使用v-bind来进行属性的绑定-->
				<router-link v-bind:to="'/home/newinfo/' +item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h1>{{ item.title }}</h1>
						<p class='mui-ellipsis'>
							<span>发表时间：{{ item.add_time | dataFilter }}</span>
							<span>点击{{ item.click }}次</span>
						</p>
				</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	
	export default{
		data:function(){
			return {
				newsList:[]
			}
		},
		created(){
			this.getXinwen()
		},
		methods:{
			//获取到新闻资讯数据的函数
			getXinwen(){
				//发送get请求
				this.$http.get("api/getnewslist").then(result => {
					if (result.body.status === 0) {
						//发送get请求成功,result就是拿到的发送请求的数据
						//请求成功，就把数据给上面定义的数组中，保存数据
						this.newsList=result.body.message
					} else{
						//发送get请求失败
						Toast("请重试！发送请求失败");
					}
				})
			}
		}
	}
</script>

<style scss="lang" scoped>
	.mui-media-body h1{
		font-size: 14px;
	}
	.mui-ellipsis{
		color: #226aff;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
	}
</style>
