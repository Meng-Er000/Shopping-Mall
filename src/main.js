//入口文件
//导入Vue模块
import Vue from "Vue"
//导入app这个组件
import app from "./app.vue"


//导入mint-ui的样式
import "./lib/mui-master/dist/css/mui.css"
import "./lib/mui-master/dist/css/icons-extra.css"

//导入路由模块
import VueRouter from "vue-router"
Vue.use(VueRouter)
//导入vue-resource组件
import VueResource from "vue-resource"
Vue.use(VueResource)
//安装图片浏览模块
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

/*
//按需导入
import { Header } from 'mint-ui';  //头部的模块
import { Swipe, SwipeItem } from 'mint-ui';  //轮播图
import { Button } from 'mint-ui';//导入按钮模块
import { Lazyload } from 'mint-ui'; //导入懒加载模块
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
*/

//使用懒加载就必须要全部导入
import Mint from "mint-ui"
Vue.use(Mint)

import 'mint-ui/lib/style.css'



//设置请求的根路径
Vue.http.options.root="http://www.liulongbin.top:3005/"

//导入路由文件
import router from "./router.js"

//导入格式化时间的插件
import moment from "moment"
//定义一个过滤器
Vue.filter("dataFilter",function(dataStr,pattert="YYYY-MM-DD HH:MM:SS"){
	return moment(dataStr).format(pattert)
})


//实例化对象
var vm=new Vue({
	el:"#app",
	data:{
		
	},
	render:function(createElement){
		return createElement(app)
	},
	router:router
})