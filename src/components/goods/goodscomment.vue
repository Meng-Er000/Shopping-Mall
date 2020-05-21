<template>
	<div>
		<!--父子组件之间的传值-->
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
				pageindex:1
			}
		},
		created(){
			this.getgoodscomment()
		},
		methods:{
			getgoodscomment(){
				this.$http.get("api/getcomments/"+this.id+"?"+"pageindex="+this.pageindex).then(result => {
					if (result.body.status === 0) {
						
					} else{
						Toast('请求失败，请重试');
					}
				})
			}
		},
		components:{
			comment
		}
	}
</script>

<style>
</style>
