import {
  apiBaseUrl
} from './config.js';
import * as common from './common.js'
import * as db from './db.js'
import {
  get,
  post
} from './js/common.js'

// const post = (url, data, callback) => {
//   uni.showLoading({
//     title: '加载中'
//   });
//   console.log(url)
//   console.log(data)

//   uni.request({
//     url: apiBaseUrl + url || '',
//     method: 'POST',
//     data: data || {},
//     header: {},
//     success: (response) => {
//       uni.hideLoading();
//       callback(response);
//     },
//     complete: () => {
//       uni.hideLoading();
//     },
//     fail: (error) => {
//       uni.hideLoading();
//       if (error && error.response) {
//         showError(error.response);
//       }
//     },
//   });

// }

// const get = (url, callback) => {
//   uni.showLoading({
//     title: '加载中'
//   });
//   uni.request({
//     url: url,
//     header: {},
//     method: 'GET',
//     success: (response) => {
//       uni.hideLoading();
//       callback(response.data);
//     },
//     fail: (error) => {
//       uni.hideLoading();
//       if (error && error.response) {
//         showError(error.response);
//       }
//     },
//     complete: () => {
//       setTimeout(function() {
//         uni.hideLoading();
//       }, 250);
//     }
//   });
// }

// const get = (url, data = {}) => {
//   uni.showLoading({
//     title: '加载中'
//   });
//   console.log(apiBaseUrl + url)
//   return new Promise((resolve, reject) => {
//     uni.request({
//       url: apiBaseUrl + url,
//       method: 'GET',
//       data: data,
//       header: {},
//     }).then(data => {
//       uni.hideLoading();
//       let [err, res] = data;
//       resolve(res);
//     }).catch(error => {
//       uni.hideLoading();
//       reject(error)
//     })
//   });
// }



// const post = (url, data, options = {}) => {
//   options.type = 'POST';
//   options.data = data;
//   options.url = url;
//   return request(options)
// }

const showError = error => {
  let errorMsg = ''
  switch (error.status) {
    case 400:
      errorMsg = '请求参数错误'
      break
    case 401:
      errorMsg = '未授权，请登录'
      break
    case 403:
      errorMsg = '跨域拒绝访问'
      break
    case 404:
      errorMsg = `请求地址出错: ${error.config.url}`
      break
    case 408:
      errorMsg = '请求超时'
      break
    case 500:
      errorMsg = '服务器内部错误'
      break
    case 501:
      errorMsg = '服务未实现'
      break
    case 502:
      errorMsg = '网关错误'
      break
    case 503:
      errorMsg = '服务不可用'
      break
    case 504:
      errorMsg = '网关超时'
      break
    case 505:
      errorMsg = 'HTTP版本不受支持'
      break
    default:
      errorMsg = error.msg
      break
  }
  uni.showToast({
    title: errorMsg,
    icon: 'none',
    duration: 1000,
    complete: function() {
      setTimeout(function() {
        uni.hideToast();
      }, 1000);
    }
  });
}

const getDepartmentList = () => {
  return get('/api/list/department')
}
const adminLogin = (data) => {
  return post('/api/admin/login', data)
}

export {
  // request,
  // get,
  // post,
  getDepartmentList,
  adminLogin
};
// export const {
//   getDepartmentList: function() {
//     return get('/api/list/department')
//   }
// }

// export const adminLogin = (data, callback) => post('/api/admin/login', data, callback);
