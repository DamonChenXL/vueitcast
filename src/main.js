// 1.0 导入vue核心包
import Vue from 'vue';
import VueRouter from 'vue-router';
// 2.0 导入App.vue的vue对象
import App from './App.vue';


import home from './components/Home.vue';
import cart from './components/shopcar/cart.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';
Vue.use(VueRouter);

var router=new VueRouter({
	linkActiveClass:'mui-active',//改变路由激活时的class名称
	routes:[
		{path:'/',redirect:'/home'},
		{path:'/home',component:home},
		{path:'/cart',component:cart},
		{path:'/news/newslist',component:newslist},
		{path:'/news/newsinfo/:id',component:newsinfo},
		{path:'/photo/photolist',component:photolist},
		{path:'/photo/photoinfo/:id',component:photoinfo},
		{path:'/goods/goodslist',component:goodslist},
		{path:'/goods/goodsinfo/:id',component:goodsinfo},
		{path:'/goods/goodsdesc/:id',component:goodsdesc},
		{path:'/goods/goodscomment/:id',component:goodscomment}
	]  
})
//注册mint-ui
import 'mint-ui/lib/style.min.css'
import mintui from "mint-ui";
Vue.use(mintui);
//注册MUI

import '../statics/mui/css/mui.css';
import '../statics/mui/css/icons-extra.css'
//导入当前系统的全部基本样式
import '../statics/css/site.css';

//导入vue-resource 实现ajax请求
import vueResource from 'vue-resource';	

Vue.use(vueResource);


//全局过滤器实现日期格式化
import moment from 'moment';
Vue.filter('datefmt',function(input,fmtstring){
   //使用momentjs类库实现日期格式化
    return moment(input).format(fmtstring);
});
//使用vue图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// 3.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	router,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});