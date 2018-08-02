import Vue from 'vue';
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
// 引入index组件
import index from './components/index.vue';
// 引入商品详情组件
import goodsInfo from './components/goodsInfo.vue';

// 引入css样式
import './assets/statics/site/css/style.css';
// 引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 公用地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 崩溃后的备用服务器
// axios.defaults.baseURL = 'http://127.0.0.1:8848';
// 导入 axios模块 目的是让所有组件都可以使用
import axios from "axios";
// 导入时间插件
import moment from 'moment';
// 挂载到vue原型上
Vue.prototype.axios = axios;
// 全局过滤器   切割时间
Vue.filter('cutTime',function(value){
 return moment(value).format('YYYY年MM月DD日'); 
})
// 引入路由中间件
Vue.use(VueRouter)
// 引入iview中间件
Vue.use(iView);
// 引入element-ui中间件
Vue.use(ElementUI);
// 引入懒加载中间件
Vue.use(VueLazyload, {
  // 图片当做资源来引入
  loading: require('./assets/statics/img/01.gif')
});
// 注册路由规则
const router = new VueRouter({
  routes :[
    // 重定向
    {
      path:'/',
      redirect:'/index'
    },
    {
      path:'/index',
      component:index
    },
    // 动态路径参数 以冒号开头
    {
      path:'/goodsInfo/:id',
      component:goodsInfo
    }
  ]
})

Vue.config.productionTip = false;
new Vue({
  // 挂载到vue
  router,
  // 渲染App组件
  render:h =>h(App),
}).$mount('#app');