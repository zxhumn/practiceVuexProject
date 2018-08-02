import Vue from 'vue';
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
// 引入index组件
import index from './components/index.vue';
// 引入css样式
import './assets/statics/site/css/style.css';
// 引入路由中间件
Vue.use(VueRouter)
// 注册路由规则
const router = new VueRouter({
  routes :[
    // 重定向
    {
      path:'/',
      redirect:index
    },
    {
      path:'/index',
      component:index
    }
  ]
})

Vue.config.productionTip = false;
new Vue({
  // 渲染App组件
  render:h =>h(App),
  // 挂载到vue
  router,
}).$mount('#app');