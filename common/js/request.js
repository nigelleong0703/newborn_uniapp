import * as db from 'common/db';

const baseUrl = 'http://43.138.3.76:8000'

function checkLogin() {
  // console.log(uni.getStorageSync('token'))
  if (!uni.getStorageSync('token')) {
    console.log('Token expired')
    uni.showModal({
      content: '令牌失效，请重新登录',
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          db.set('login_status', false)
          db.clear()
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }
      }
    })
  }
  return
}

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

const nurseList = (departmentNo) => {
  return get('/api/nurse', {
    department: departmentNo
  })
}

const nurseDetail = (id) => {
  return get('/api/nurse/${id}')
}

const patientList = (departmentNo) => {
  return get('/api/patient', {
    department: departmentNo
  })
}

const patientDetail = (id) => {
  return get('/api/patient/${id}')
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

const editPatient = (id, data) => {
    let newUrl = '/api/patient/update/' + id
    console.log(newUrl)
    return patch(newUrl, {
        name: data.name,
        gender: data.gender,
        birthdate: data.birthdate,
        guardian: data.guardian,
        guardianId: data.guardianId,
        relation: data.relation,
        tel: data.tel,
        status: data.status,
        inDate: data.inDate,
        outDate: data.outDate,
        department: data.department,
        room: data.room,
        bed: data.bed,
        allergy: data.allergy
    })
}

const editTransfusion = (id, data) => {
    let newUrl = '/api/transfusion/update/' + id
    console.log(newUrl)
    return patch(newUrl, {
        name: data.name,
        startTime: data.startTime,
        vein: data.vein,
        veil: data.tool,
    })
}

const editWard = (id, data) => {
    let newUrl = '/api/check/update/' + id
    console.log(newUrl)
    return patch(newUrl, {
        time: data.time,
        info: data.info
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

const deleteAdmin = (id) => {
  let newUrl = '/api/admin/delete/' + id;
  return patch(newUrl)
}

const deleteNurse = (id) => {
  let newUrl = '/api/nurse/delete/' + id;
  return patch(newUrl)
}

const deletePatient = (id) => {
  let newUrl = '/api/patient/delete/' + id;
  return patch(newUrl)
}


export default {
  get,
  post,
  patch,
  checkLogin,
  getDepartmentList,
  getDrugList,
  getToolList,
  getVeinList,
  adminLogin,
  nurseList,
  nurseDetail,
  patientList,
  patientDetail,
  editDepartment,
  editDrug,
  editTool,
  editVein,
  editPatient,
  editTransfusion,
  editWard,
  addDepartment,
  addDrug,
  addTool,
  addVein,
  deleteAdmin,
  deleteNurse,
  deletePatient,

}
