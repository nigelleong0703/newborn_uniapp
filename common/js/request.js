// const BASE_URL = "http://43.138.3.76:8000/"
// export const myRequest = (options) => {
//   return new Promise((resolve, reject) => {
//     uni.request({
//       url: BASE_URL + options.url,
//       method: options.method || 'GET',
//       data: options.data || {},
//       success: (res) => {
//         resolve(res)
//       },
//       fail: (err) => {
//         uni.showToast({
//           title: "请求接口失败"
//         })
//         reject(err)
//       }
//     })
//   })

// }


// request.js
// 通常可以吧 baseUrl 单独放在一个 js 文件了
const baseUrl = 'http://43.138.3.76:8000'

const request = (options = {}) => {
  // 在这里可以对请求头进行一些设置
  // 例如：
  // options.header = {
  //      "Content-Type": "application/x-www-form-urlencoded"
  // }
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + options.url || '',
      method: options.type || 'GET',
      data: options.data || {},
      header: options.header || {}
    }).then(data => {
      let [err, res] = data;
      resolve(res);
    }).catch(error => {
      reject(error)
    })
  });
}

const get = (url, data, options = {}) => {

  options.type = 'GET';
  options.data = data;
  options.url = url;
  return request(options)
}

const post = (url, data, options = {}) => {
  options.type = 'POST';
  options.data = data;
  options.url = url;
  return request(options)
}

export default {
  request,
  get,
  post
}
