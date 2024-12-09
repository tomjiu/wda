/* 封装axios用于发送请求 */
import axios from 'axios'
import {Toast} from 'vant'
import  store  from '@/store'

// 创建一个新的axios实例
// 好处：不会污染原始的axios模块
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'H5' }

})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  //开启loading 禁止背景点击（节流效果）
  Toast.loading({
    message:'加载中 马上好',
    forbidClick:true,   //禁止背景点击
    loadingType:'spinner', //配置loading图标
    duration:0 //不会自动消失
  })  
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  // 在发送请求之前做些什么
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  
//   // 添加响应拦截器
  request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const res= response.data

    if(res.status!==200){
      //给提示
      Toast(res.message)
      //抛出一个错误的promise
      return Promise.reject(res.message)
    }
    else{
      //清楚loading效果
      Toast.clear()
    }
   return res
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  
  export default request