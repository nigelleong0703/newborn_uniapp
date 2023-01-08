import * as db from 'common/db';

const baseUrl = 'http://43.138.3.76:8000'

function checkLogin() {
    if (!db.get('token')) {
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
            header: { Authorization: db.get('token') }
        }).then(data => {
            let [err, res] = data;
            resolve(res);
        }).catch(error => {
            console.log(err)
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

const getCheckList = (id) => {
    return get('/api/check?patientId=' + id)
}

const getPatientList = (id) => {
    return get('/api/patient?department=' + id)
}

const getTransfusionList = (id) => {
    return get('/api/transfusion?patientId=' + id)
}

const adminLogin = (data) => {
    return post('/api/admin/login', data)
}

const nurseLogin = (data) => {
    return post('/api/nurse/login', data)
}

const nurseList = (departmentNo) => {
    return get('/api/nurse', {
        department: departmentNo
    })
}

const nurseDetail = (id) => {
    return get('/api/nurse/' + id)
}

const patientList = (departmentNo) => {
    return get('/api/patient', {
        department: departmentNo
    })
}

const patientDetail = (id) => {
    return get('/api/patient/' + id)
}

const editDepartment = (id, data) => {
    let newUrl = '/api/list/department/update/' + id
    return patch(newUrl, {
        name: data.name
    })
}

const editDrug = (id, data) => {
    let newUrl = '/api/list/drug/update/' + id
    return patch(newUrl, {
        name: data.name
    })
}

const editTool = (id, data) => {
    let newUrl = '/api/list/tool/update/' + id
    return patch(newUrl, {
        name: data.name
    })
}

const editVein = (id, data) => {
    let newUrl = '/api/list/vein/update/' + id
    return patch(newUrl, {
        name: data.name
    })
}

const editPatient = (id, data) => {
    let newUrl = '/api/patient/update/' + id
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

const editNurse = (id, data) => {
    return patch('/api/nurse/update/' + id, data)
}

const editAdmin = (id, data) => {
    return patch('/api/admin/update/' + id, data)
}

const editTransfusion = (id, data) => {
    let newUrl = '/api/transfusion/update/' + id
    return patch(newUrl, {
        name: data.name,
        startTime: data.startTime,
        vein: data.vein,
        veil: data.tool,
    })
}

const editWard = (id, data) => {
    let newUrl = '/api/check/update/' + id
    return patch(newUrl, {
        time: data.time,
        info: data.info
    })
}

const addCheck = (data) => {
    return post('/api/check/add', data)
}

const addDepartment = (data) => {
    return post('/api/list/department/add', data)
}

const addDrug = (data) => {
    return post('/api/list/drug/add', data)
}

const addTool = (data) => {
    return post('/api/list/tool/add', data)
}

const addVein = (data) => {
    return post('/api/list/vein/add', data)
}

const addTransfusion = (data) => {
    return post('/api/transfusion/add', data)
}

const addAdmin = (data) => {
    return post('/api/admin/add', data)
}

const addPatient = (data) => {
    return post('/api/patient/add', data)
}

const addNurse = (data) => {
    return post('/api/nurse/add', data)
}

const deleteAdmin = (id) => {
    return patch('/api/admin/delete/' + id);
}

const deleteNurse = (id) => {
    return patch('/api/nurse/delete/' + id);
}

const deletePatient = (id) => {
    return patch('/api/patient/delete/' + id);
}

const deleteDepartment = (id) => {
    return patch('/api/list/department/delete/' + id);
}

const deleteTool = (id) => {
    return patch('/api/list/tool/delete/' + id);
}

const deleteVein = (id) => {
    return patch('/api/list/vein/delete/' + id);
}

const deleteDrug = (id) => {
    return patch('/api/list/drug/delete/' + id);
}

const deleteCheck = (id) => {
    return patch('/api/check/delete/' + id);
}

const deleteTransfusion = (id) => {
    return patch('/api/transfusion/delete/' + id)
}

const getPatientInfo = (id) => {
    return get('/api/patient/' + id)
}

const getNurseInfo = (id) => {
    return get('/api/nurse/' + id)
}

const getTransfusionInfo = (id) => {
    return get('/api/transfusion/' + id)
}

const changeDrug = (id) => {
    return patch('/api/transfusion/update/' + id + '/next')
}

const finishDrug = (id) => {
    return patch('/api/transfusion/update/' + id + '/finish')
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
    getCheckList,
    getPatientList,
    getTransfusionList,
    adminLogin,
    nurseLogin,
    nurseList,
    nurseDetail,
    patientList,
    patientDetail,
    editDepartment,
    editDrug,
    editTool,
    editVein,
    editPatient,
    editNurse,
    editAdmin,
    editTransfusion,
    editWard,
    addCheck,
    addDepartment,
    addDrug,
    addTool,
    addAdmin,
    addPatient,
    addNurse,
    addVein,
    addTransfusion,
    deleteAdmin,
    deleteNurse,
    deletePatient,
    deleteDepartment,
    deleteDrug,
    deleteTool,
    deleteVein,
    deleteCheck,
    deleteTransfusion,
    getPatientInfo,
    getNurseInfo,
    getTransfusionInfo,
    changeDrug,
    finishDrug,
}
