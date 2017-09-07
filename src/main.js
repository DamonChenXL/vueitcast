// 1.0 导入vue核心包
import Vue from 'vue';
import VueRouter from 'vue-router';
// 2.0 导入App.vue的vue对象
import App from './App.vue';


import login from './components/account/login.vue';
import register from './components/account/register.vue';
Vue.use(VueRouter);

var router=new VueRouter({
	routes:[
		{path:'/login',component:login},
		{path:'/register',component:register}
	]
})
//注册mint-ui
import 'mint-ui/lib/style.min.css'
import mintui from "mint-ui";
Vue.use(mintui);
//注册MUI

import '../statics/mui/css/mui.css';
// 3.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	router,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});