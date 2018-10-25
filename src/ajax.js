import axios from 'axios'
const ajaxPlus = {}

// 添加一个响应拦截器
axios.interceptors.response.use(
  response => {
    if (response) {
      // 根据状态码，前端操作页面行为
    }
    return response
  },
  error => {
    console.log(error + 'response')
    return Promise.reject(error)
  }
)

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

ajaxPlus.install = function (Vue, options) {
  const axiosInstance = axios.create(options)
  Vue.prototype.$ajax = axiosInstance
  Vue.prototype.$ajaxPlus = function (
    method,
    url,
    _data = {},
    cb = () => {},
    cbCfg = {},
    _invoking = 'loading'
  ) {
    let obj = _data
    typeof _data === 'function' && ((obj = {}), (cb = _data))
    const param = method.toLowerCase() === 'get' ? 'params' : 'data'
    const opt = {
      url,
      method,
      [param]: obj
    }
    return axiosInstance
      .request(opt)
      .then(res => {
        cb(res)
      })
      .catch(err => {
        cbCfg && cbCfg.catchCb && cbCfg.catchCb()
        console.error('axios', url, err)
      })
      .finally(() => {
        _invoking && (this[_invoking] = false)
        cbCfg && cbCfg.finallyCb && cbCfg.finallyCb()
      })
  }

  Vue.mixin({
    data () {
      return {
        loading: false
      }
    }
  })
}

export default ajaxPlus
