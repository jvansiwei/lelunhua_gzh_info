import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueRouter from 'vue-router'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator'; //如果你需要在桌面端使用 Vant，可以引入我们提供的 @vant/touch-emulator，这个库会在桌面端自动将mouse事件转换成对应的touch事件，使得组件能够在桌面端使用。
import axios from 'axios'


Vue.prototype.$ajax = axios
Vue.use(Vant);

Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
