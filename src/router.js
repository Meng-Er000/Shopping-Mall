import VueRouter from "vue-router"

//导入对应的路由组件
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import NewsList from "./components/news/NewsList.vue"
import NewsInfo from "./components/news/NewsInfo.vue"
import PhotoList from "./components/photo/photoList.vue"
import PhotoInfo from "./components/photo/photoInfo.vue"
import GoodsList from "./components/goods/GoodsList.vue"
import GoodsInfo from "./components/goods/GoodsInfo.vue"
import GoodsIntroduce from "./components/goods/introduce.vue"
import GoodsComment from "./components/goods/goodscomment.vue"


//创建一个路由对象
var router=new VueRouter({
	routes:[
		{ path:"/", redirect: "/home" },
		{ path: '/home', component: HomeContainer },
		{ path: '/member', component: MemberContainer },
		{ path: '/search', component: SearchContainer },
		{ path: '/shopcar', component: ShopcarContainer },
		{ path: '/home/newslist', component: NewsList },
		//路由中如何传递参数
		{ path: "/home/newinfo/:id", component:NewsInfo},
		{ path: "/home/photoList" ,component:PhotoList},
		{ path:'/home/getimageInfo/:id',component:PhotoInfo},
		{ path:"/home/goodslist",component:GoodsList},
		{ path:"/home/goodsinfo/:id",component:GoodsInfo},
		{ path:"/home/introduce/:id",component:GoodsIntroduce,name:"goodsintroduce"},
		{ path:"/home/comment/:id",component:GoodsComment,name:"goodscomment"}
	],
	linkActiveClass:"mui-active"  //覆盖默认路由高亮的类。默认的类的名称是“linkActive”
})

//导出这个路由对象
export default  router