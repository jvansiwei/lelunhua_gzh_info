import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '*', 
    redirect: '/'
  },
  {
  path: '/',
  name: 'home',
  component: () => import('@/view/home'),
}, {
  path: '/info',
  name: 'Info',
  component: () => import('@/view/info'),
}, {
  path: '/down',
  name: 'Down',
  component: () => import('@/view/down'),
}]

const router = new VueRouter({
  mode: 'history',  //去掉url中的#
  base:"/query",
  routes
})

export default router