import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex) //让Vuex可以访问到Vue
Vue.config.productionTip = false

const store =new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state,n) {
      //this.state.count++ 或
      state.count += n
    }
  },
  //异步请求
  // actions: {
  //   increment({state}) {//参数是state，但只是包含state的数据
  //     setTimeout(()=>{
  //       state.count++
  //     },3000)
  //   }
  // },
  // getters: {
  //   doubleCount(state) {
  //     return state.count + 2
  //   }
  // }
})
Vue.prototype.$store = store
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
