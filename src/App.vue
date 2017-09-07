<!-- 以后项目的根组件 -->
<template>
  <div class="app">
	 <!-- 利用mint-ui实现头部 -->
	 <mt-header fixed title="Damon.Vue商城系统"></mt-header>
	 <!-- 利用vue-router的router-view占位 -->
	 <router-view></router-view> 
	 <!-- 利用MUI的tabbar实现底部 -->
     <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
// 按需导入
// import calc from './calc.js';
// import { Toast } from 'mint-ui';
// 负责导出 .vue这个组件对象(它本质上是一个Vue对象,所以Vue中该定义的元素都可以使用)
export default {  // es6的导出对象的写法
	data() {  //等价于 es5的 data:function(){
		return {
			
		}
	},
	methods: {
		

	},
	created() {

	}
}
</script>

<style scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
.app{
	padding-top:40px;
	padding-bottom: 50px;
}
</style>