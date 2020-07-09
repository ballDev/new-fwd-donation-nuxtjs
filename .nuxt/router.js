import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f966311a = () => interopDefault(import('../pages/confirm-payment/index.vue' /* webpackChunkName: "pages/confirm-payment/index" */))
const _0c3f19da = () => interopDefault(import('../pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */))
const _71e54542 = () => interopDefault(import('../pages/edit-profile/index.vue' /* webpackChunkName: "pages/edit-profile/index" */))
const _7e78d94e = () => interopDefault(import('../pages/history/index.vue' /* webpackChunkName: "pages/history/index" */))
const _4347120a = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _000e39a3 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _6d802fba = () => interopDefault(import('../pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _e35af982 = () => interopDefault(import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */))
const _7806bbb7 = () => interopDefault(import('../pages/renew-password/index.vue' /* webpackChunkName: "pages/renew-password/index" */))
const _8f7d7012 = () => interopDefault(import('../pages/confirm-payment/result/_id.vue' /* webpackChunkName: "pages/confirm-payment/result/[_]id" */))
const _90fe2e8a = () => interopDefault(import('../pages/project/_id.vue' /* webpackChunkName: "pages/project/[_]id" */))
const _1626e809 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/confirm-payment",
    component: _f966311a,
    name: "confirm-payment"
  }, {
    path: "/contact",
    component: _0c3f19da,
    name: "contact"
  }, {
    path: "/edit-profile",
    component: _71e54542,
    name: "edit-profile"
  }, {
    path: "/history",
    component: _7e78d94e,
    name: "history"
  }, {
    path: "/home",
    component: _4347120a,
    name: "home"
  }, {
    path: "/login",
    component: _000e39a3,
    name: "login"
  }, {
    path: "/profile",
    component: _6d802fba,
    name: "profile"
  }, {
    path: "/register",
    component: _e35af982,
    name: "register"
  }, {
    path: "/renew-password",
    component: _7806bbb7,
    name: "renew-password"
  }, {
    path: "/confirm-payment/result/:id",
    component: _8f7d7012,
    name: "confirm-payment-result-id"
  }, {
    path: "/project/:id?",
    component: _90fe2e8a,
    name: "project-id"
  }, {
    path: "/",
    component: _1626e809,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
