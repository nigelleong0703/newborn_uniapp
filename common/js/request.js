const baseUrl = 'http://43.138.3.76:8000'

const request = (options = {}) => {
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
