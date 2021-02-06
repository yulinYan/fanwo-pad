import Vue from 'vue'
import App from './App'
import api_url from './components/api'
import hasPermission from './components/hasPermission' // 引入接口

Vue.config.productionTip = false
Vue.prototype.apiUrl = api_url
Vue.prototype.hasPermission = hasPermission
App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store'

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)

const app = new Vue({
	store,
	...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()
