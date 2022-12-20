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

const patch = (url, data, options = {}) => {
  options.type = 'PATCH';
  options.data = data;
  options.url = url;
  return request(options)
}

const getDepartmentList = () => {
  return get('/api/list/department')
}

const getToolList = () => {
  return get('/api/list/tool')
}

const getDrugList = () => {
  return get('/api/list/drug')
}

const getVeinList = () => {
  return get('/api/list/vein')
}

const adminLogin = (data) => {
  return post('/api/admin/login', data)
}

const nurseList = departmentNo => {
  return get('/api/nurse', {
    department: departmentNo
  })
}

const nurseDetail = id => {
  return get('/api/nurse/${id}')
}

const editDepartment = (id, data) => {
  let newUrl = '/api/list/department/update/' + id
  console.log(newUrl)
  console.log(data.name)
  return patch(newUrl, {
    name: data.name
  })
}

const editDrug = (id, data) => {
  let newUrl = '/api/list/drug/update/' + id
  console.log(newUrl)
  console.log(data.name)
  return patch(newUrl, {
    name: data.name
  })
}

const editTool = (id, data) => {
  let newUrl = '/api/list/tool/update/' + id
  console.log(newUrl)
  console.log(data.name)
  return patch(newUrl, {
    name: data.name
  })
}

const editVein = (id, data) => {
  let newUrl = '/api/list/vein/update/' + id
  console.log(newUrl)
  console.log(data.name)
  return patch(newUrl, {
    name: data.name
  })
}

const addDepartment = (data) => {
  console.log(data)
  return post('/api/list/department/add', data)
}

const addDrug = (data) => {
  console.log(data)
  return post('/api/list/drug/add', data)
}

const addTool = (data) => {
  console.log(data)
  return post('/api/list/tool/add', data)
}

const addVein = (data) => {
  console.log(data)
  return post('/api/list/vein/add', data)
}


export default {
  get,
  post,
  patch,
  getDepartmentList,
  getDrugList,
  getToolList,
  getVeinList,
  adminLogin,
  nurseList,
  nurseDetail,
  editDepartment,
  editDrug,
  editTool,
  editVein,
  addDepartment,
  addDrug,
  addTool,
  addVein,
}
