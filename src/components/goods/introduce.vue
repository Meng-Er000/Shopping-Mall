<template>
	<div class="goods-introduce">
		<div class="introduce">
			<h3 class="title">{{getIntroduce.title}}</h3>
			<hr />
			<div class="content" v-html="getIntroduce.content"></div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	
	export default{
		data:function(){
			return{
				id:this.$route.params.id,
				getIntroduce:{}
			}
		},
		created(){
			this.getImgIntroduce();
		},
		methods:{
			getImgIntroduce(){
				this.$http.get("api/goods/getdesc/"+this.id).then(result => {
					if (result.body.status === 0) {
						this.getIntroduce=result.body.message[0]
					} else{
						Toast('请求失败，请重试');
					}
				})
			}
		}
	}
</script>

<style scss="lang" >
	.goods-introduce .title{
		font-size: 15px;
		color: #16A2ff;
		text-align: center;
		margin: 15px 0px;
	}
	.goods-introduce .content img{
		width: 100%;
	}
</style>
