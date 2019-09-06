import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {get,formPost,urlencodedPost} from './http/http'




Vue.use(ElementUI);

//定义全局变量
Vue.prototype.$post=formPost;
Vue.prototype.$get=urlencodedPost;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
