import {
    apiBaseUrl
} from './config.js';
import * as common from './common.js'
import * as db from './db.js'
import {
    get,
    post,
    patch
} from 'common/js/request.js'

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
        complete: function () {
            setTimeout(function () {
                uni.hideToast();
            }, 1000);
        }
    });
}

const getDepartmentList = () => {
    return get('/api/list/department')
}

const getDrugList = () => {
    return get('/api/list/drug')
}

const getVeinList = () => {
    return get('/api/list/vein', {})
}

const getToolList = () => {
    return get('/api/list/tool', {})
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


export {
    getDepartmentList,
    adminLogin,
    nurseList,
    nurseDetail,
    editDepartment,
    getDrugList,
    getToolList,
    getVeinList,
};
