// import Vue from 'vue';
// import Vuex from 'vuex';
// // import {
// //   LOGIN,
// // } from './types.js';

// import userInfo from './modules/userInfo';

// Vue.use(Vuex)

// const store = () => new Vuex.Store({
//   modules: {
//     userInfo,
//   },
//   actions: {
//     // nuxtServerInit({
//     //   _,
//     //   commit
//     // }, {
//     //   req
//     // }) {
//     //   // cookie持久化,这会导致服务的cookie缓存
//     //   // if (req.headers.cookie) {
//     //   //   // 解析cookie
//     //   //   let cookie = req.headers.cookie,
//     //   //     cookieObj = {},
//     //   //     cookieArr = [],
//     //   //     key = '',
//     //   //     value = '';
//     //   //   cookie = cookie.split(';')
//     //   //   for (let i = 0; i < cookie.length; i++) {
//     //   //     cookieArr = cookie[i].trim().split('=')
//     //   //     key = cookieArr[0]
//     //   //     value = cookieArr[1]
//     //   //     cookieObj[key] = value
//     //   //   }

//     //   //   if (cookieObj.userInfo) {
//     //   //     const userInfo = JSON.parse(decodeURIComponent(cookieObj.userInfo));
//     //   //     if (userInfo) {
//     //   //       commit(LOGIN, userInfo)
//     //   //     }
//     //   //   }
//     //   // }
//     // },
//   }
// })

// export default store;







import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


const store = () => new Vuex.Store({
  modules
})

export default store;