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
Vue.prototype.$api = "http://192.168.1.168:8080" //api地址
//Vue.prototype.$api = "http://192.168.0.143:8081" //api地址
//Vue.prototype.$resouceUrl = "http://localhost:8081/"  //资源文件地址
Vue.config.debug = true;// 开启debug模式

var router = new VueRouter({
  mode: "history",
  hashbang: false,
  routes: [
    {
      path: '/',
      component: require('./routers/loupan_list.vue')
    },
    {
      path: '/index',
      component: require('./routers/loupan_list.vue')
    },
    {
      path: '/loupan_basic/:lpid',
      component: require('./routers/loupan_basic.vue')
    },
    {
      path: '/loupan_households/:lpid',
      component: require('./routers/loupan_households.vue')
    },
    {
      path: '/loupan_property/:lpid',
      component: require('./routers/loupan_property.vue')
    },
    {
      path: '/loupan_area/:lpid',
      component: require('./routers/loupan_area.vue')
    },
    {
      path: '/loupan_parking/:lpid',
      component: require('./routers/loupan_parking.vue')
    },
    {
      path: '/loupan_image/:lpid',
      component: require('./routers/loupan_image.vue')
    },
    {
      path: '/loupan_analyse/:lpid',
      component: require('./routers/loupan_analyse.vue')
    },
    {
      path: '/zuodong_list/:lpid',
      component: require('./routers/zuodong_list.vue')
    },
    {
      path: '/fang_list/:lpid',
      component: require('./routers/fang_list.vue')
    },
    {
      path: '/zuodong_basic/:lpid/:zdid',
      component: require('./routers/zuodong_basic.vue')
    },
    {
      path: '/zuodong_elevator/:zdid',
      component: require('./routers/zuodong_elevator.vue')
    },
    {
      path: '/zuodong_area/:zdid',
      component: require('./routers/zuodong_area.vue')
    },
    {
      path: '/zuodong_households/:zdid',
      component: require('./routers/zuodong_households.vue')
    },
    {
      path: '/zuodong_price/:zdid',
      component: require('./routers/zuodong_price.vue')
    },
    {
      path: '/zuodong_image/:zdid',
      component: require('./routers/zuodong_image.vue')
    },
    {
      path: '/zuodong_rent/:zdid',
      component: require('./routers/zuodong_rent.vue')
    },
    {
      path: '/zuodong_property/:zdid',
      component: require('./routers/zuodong_property.vue')
    },
    {
      path: '/fang_list/:lpid/:zdid',
      component: require('./routers/fang_list.vue')
    },
    {
      path: '/fang_basic/:lpid/:fyid',
      component: require('./routers/fang_basic.vue')
    },
    {
      path: '/fang_struct/:fyid',
      component: require('./routers/fang_struct.vue')
    },
    {
      path: '/fang_owner/:fyid',
      component: require('./routers/fang_owner.vue')
    },
    {
      path: '/fang_owner/add/:fyid',
      component: require('./routers/fang_add_owner.vue')
    },
    {
      path: '/fang_owner/edit/:yzid',
      component: require('./routers/fang_edit_owner.vue')
    },
    {
      path: '/fang_agenter/:fyid',
      component: require('./routers/fang_agenter.vue')
    },
    {
      path: '/fang_agenter/add/:fyid',
      component: require('./routers/fang_add_agent.vue')
    },
    {
      path: '/fang_agenter/edit/:dlid',
      component: require('./routers/fang_edit_agent.vue')
    },
    {
      path: '/fang_renter/:fyid',
      component: require('./routers/fang_renter.vue')
    },
    {
      path: '/fang_renter/add/:fyid',
      component: require('./routers/fang_add_rent.vue')
    },
    {
      path: '/fang_renter/edit/:zhid',
      component: require('./routers/fang_edit_rent.vue')
    },
    {
      path: '/fang_image/:fyid',
      component: require('./routers/fang_image.vue')
    },
    {
      path: '/fang_analyse/:fyid',
      component: require('./routers/fang_analyse.vue')
    },
    {
      path: '/fang_decor/:fyid',
      component: require('./routers/fang_decor.vue')
    },
    {
      path: '/fang_reg/:fyid',
      component: require('./routers/fang_reg.vue')
    },
    {
      path: '/login',
      component: require('./routers/login.vue')
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
