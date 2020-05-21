//引入路径这个模块
var path = require('path');
var webpack=require("webpack")  //启用热更新，第二步：引入webpack模块
var htmlWebpackPlugin=require("html-webpack-plugin")  //引用html-webpack-plugin插件
var VueLoaderPlugin = require('vue-loader/lib/plugin')  //引用vue-loader/lib/plugin插件

module.exports = {
  mode: 'development',
  //初始文件位置。没有经过处理的
  entry: './src/main.js',
  //经过webpack处理的文件位置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'double.js'
  },
   devServer: {
	  open:true,   //是否自动打开浏览器
      contentBase: "src",   //指定根目录
      port: 3000,//更改端口号
	  hot:true  ,//启用热更新，第一步
   },
   plugins:[ //配置插件的节点，所有插件都必须要写在这个里面
	   new webpack.HotModuleReplacementPlugin(),  //启用热更新，第三步：new一个热更新模块对象
	   new htmlWebpackPlugin({   //把页面存放到内存中，并且打包输出这个页面
		   template:path.join(__dirname,"./src/index.html"),  //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
		   filename: 'index.html'  //指定生成的页面名称，这个页面会存放到内存中去
	   }),
	   new VueLoaderPlugin()
   ],
   module: {  //这个是存放所有的配置节点
       rules: [   //存放第三方文件的配置和匹配规则
		//详细文档可以见webpack官网查询
         {test:/\.css$/,use: [{ loader: 'style-loader' },{loader: 'css-loader'}]},
		 {test:/\.jpg|png|gif|bmp|jpeg$/,use:"url-loader?limit=10240&name=[name].[ext]&esModule=false"},
		 /*
		 加载图片的包file-loader。
		 传入参数：limit是否把图片路径转换为base64位。
		 如果limit参数值是false那么就是不转换为64位数。如果参数值等于或者大于图片的字节大小，那么就会转换为64位数
		 name参数：是否把图片的名字转换为其他格式。[path][name].[ext]：[路径][图片名字].[图片的后缀格式]
		 */
		/*
		如果，想要图片的路径有hash数值，避免图片重名的话，那么就可以在名字之前写上[path][hash:8]-[name].[ext]这样来写。
		[hash:8]的意思就是：截取hash值得前八位数
		*/
	   //配置字体图片的匹配规则
		 {test: /\.(svg|ttf|eot|woff|woff2)$/,use:[{loader: 'file-loader'}]},
	   //添加Babel匹配规则
	     { test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ },
		//配置后缀名为.vue文件的匹配规则
		{test:/\.vue$/,use:"vue-loader"}
		 ]
     },
   resolve:{
	   alias:{  //修改vue被导入时候的包的路径
		   Vue$: path.resolve(__dirname, 'node_modules/Vue/dist/vue.js')
	   }
   }
};