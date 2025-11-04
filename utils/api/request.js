import axios from 'axios'
import { tansParams } from '../../src/modules/base'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'http://quesb.com/',
  // 超时
  timeout: 240000,
})

// request拦截器
service.interceptors.request.use(
  config => {
    console.log('config :>> ', config)
    console.log('this :>> ', this)
    config.url = config?.url?.includes('http') ? config.url : `${config.baseURL}${config.url}`
    // 是否需要设置 token headers: { isToken: false },
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    // 未设置状态码则默认成功状态
    const code = res?.data?.code || 200
    // 获取错误信息
    const msg = res?.data?.msg || '系统错误'
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code !== 200) {
      return Promise.reject(msg)
    } else {
      return Promise.resolve(res.data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
