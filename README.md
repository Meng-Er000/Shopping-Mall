## 制作首页APP组件

1. 完成header区域，使用的是Mint-UI中的header组件
2. 制作底部的tabber区域，使用的是Mint-UI组件中的tabber.html
   - 在制作购物车的小图标的时候，会有一定的操作
   - 先把想要扩展图标的css样式，copy到项目中去
   - 拷贝，扩展字体库ttf文件，到项目中去
   - 为购物车小图标，添加如下样式："`mui-icon mui-icon-extra mui-icon-extra-cart`"
3. 要在中间区域放置一个router-view来展示路由匹配的组件

格式化时间的插件：`moment`

`import moment from "moment"`

在使用格式化时间插件之上，定义一个过滤器：

```javascript
Vue.filter("dataFilter",function(dataStr,pattert="YYYY-MM-DD HH:MM:SS"){
	return moment(dataStr).format(pattert)
})
```

移除严格模式

CSS属性 **touch-action** 用于设置触摸屏用户如何操纵元素的区域(例如，浏览器内置的缩放功能)。 <https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action> 

## 如何在手机上面调试开发

1. 要保证手机和开发项目的电脑，处于同一个wifi条件下面，也就是说手机可以访问到电脑的IP
2. 打开自己的项目中的package.json文件，在dev脚本中，添加--host指令，把当前电脑的ip地址设置为--host 指令值
3. 在cmd终端中执行ipconfig指令。然后就可以查看到ip地址

## 网页中，两种方式实现页面的跳转

1. 使用a标签的形式，实现页面跳转
2. 使用window.location.href的形式，叫做编程式导航

domobject.getBoundingClientRect()    获取到这个dom元素距离页面左边的距离