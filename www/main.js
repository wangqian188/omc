/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import App from './app.vue';
import $ from 'jquery';
import MintUI from 'mint-ui';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import search from './routers/search.vue';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);
Vue.prototype.$api = "http://116.62.71.76:8001/api/GetServiceApiResult" //api地址
Vue.prototype.$resouceUrl = "http://localhost:8081/"  //资源文件地址
Vue.config.debug = true;// 开启debug模式

var router = new VueRouter({
  mode: "history",
  hashbang: false,
  routes: [
    {
      path: '/list',
      component: require('./routers/list.vue'),
      children: [
        {path: "/list/search", component: search}
      ]
    },
    {
      path: '/detail',
      component: require('./routers/detail.vue')
    },
    {
      path: '/order',
      component: require('./routers/order.vue')
    },
    {
      path: '/login',
      component: require('./routers/login.vue')
    },
    {
      path: '/build_msg', //楼盘基础信息
      component: require('./routers/build_msg.vue')
    },
    {
      path: '/parking_msg', //车位信息
      component: require('./routers/parking_msg.vue')
    },
    {
      path: '/property_msg', //物业信息
      component: require('./routers/property_msg.vue')
    },
    {
      path: '/households_msg', //户数信息
      component: require('./routers/households_msg.vue')
    },
    {
      path: '*',
      component: require('./routers/login.vue')
    }

  ]
});

new Vue({
  el: '#app',
  router: router,
  render: function (h) {
    return h(App)
  }
});
