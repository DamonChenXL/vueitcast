// 1.0 导入vue核心包
import Vue from 'vue';
import VueRouter from 'vue-router';
// 2.0 导入App.vue的vue对象
import App from './App.vue';


import home from './components/Home.vue';
import cart from './components/shopcar/cart.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
Vue.use(VueRouter);

var router=new VueRouter({
	linkActiveClass:'mui-active',//改变路由激活时的class名称
	routes:[
		{path:'/',redirect:'/home'},
		{path:'/home',component:home},
		{path:'/cart',component:cart},
		{path:'/news/newslist',component:newslist},
		{path:'/news/newsinfo/:id',component:newsinfo}
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

// 3.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	router,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});