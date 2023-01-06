import request from 'common/js/request';
import * as db from 'common/db';

function dateTimeStr(timestamp) {
  const timeFormat = uni.$u.timeFormat;
  return timeFormat(timestamp, 'yyyy-mm-dd hh:MM');
};

function loadSystemTime() {
  var date = Number(new Date())
  var time = date
  var time_display = dateTimeStr(date)
  return [time, time_display]
};

function time_select1(model, model1, value) {
  model1.time = Math.round(value / 1000)
  model1.time_display = dateTimeStr(model1.time)
  model.time_picker = false
  return model1.time
};

function submit_form(target_url, form) {
  console.log(form)
};

function getDepartment_list() {
  request.getDepartmentList().then(res => {
    db.set('department_list', res.data)
  })
  return db.get('department_list')
};

/**
 * 统一跳转
 */
function navigateTo(url) {
  uni.navigateTo({
    url: url,
    animationType: 'pop-in',
    animationDuration: 300
  })
}

/**
 *  关闭当前页面并跳转
 */
function redirectTo(url) {
  uni.redirectTo({
    url: url,
    animationType: 'pop-in',
    animationDuration: 300
  })
}

//操作成功后，的提示信息
function successToShow(msg = '保存成功', callback = function() {}) {


  setTimeout(function() {
    uni.showToast({
      title: msg,
      icon: 'success',
      duration: 1000,
      success() {
        setTimeout(function() {
          callback()
        }, 500)
      }
    })
  }, 100)
  /*  uni.showToast({
      title: msg,
      icon: 'success',
      duration: 1000
    }) */
}

//操作失败的提示信息
function errorToShow(msg = '操作失败', callback = function() {}) {
  setTimeout(function() {
    uni.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      success() {
        setTimeout(function() {
          callback()
        }, 1500)
      }
    })
  }, 100)

}

//加载显示
function loadToShow(msg = '加载中') {
  uni.showToast({
    title: msg,
    icon: 'loading'
  })
}

//加载隐藏
function loadToHide() {
  uni.hideToast()
}

var validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入用户名'))
  } else {
    let usernameLength = /^[a-zA-Z0-9]{5,12}$/
    let usernamePattern = /^(?=^[a-zA-Z]+[0-9]+$)([a-zA-Z0-9]{5,12})$/
    if (usernameLength.test(value) === false) {
      callback(new Error('用户名长度必须在5-12之间'));
    } else if (usernamePattern.test(value) === false) {
      callback(new Error('用户名需包含字母和数字，且所有数字在字母之后'));
    } else {
      callback();
    }
  }
}

var validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else {
    let passwordLength = /^[a-zA-Z0-9]{8,15}$/
    let passwordPattern = /(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){1,})(?=(?:.*\d){1,})([A-Za-z0-9]{8,15})$/
    if (passwordLength.test(value) === false) {
      callback(new Error('密码长度必须在8-15之间'));
    } else if (passwordPattern.test(value) === false) {
      callback(new Error('密码必须且只可以有大字母，小字母和数字'));
    } else {
      callback();
    }
  }
}

var validateOldPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else {
    this.$request.post('/api/admin/login', {
      username: this.oldusername,
      password: value
    }).then(res => {
      console.log(res)
      if (res.statusCode == 200) {
        callback()
      } else {
        callback(new Error('与旧密码不一致!'))
      }
    })
  }
}

var validateSamePassword = (rule, value, value2, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== value2) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
}

function valSamePassword(value2) {
  return validateSamePassword(rule, value, value2, callback)
}

module.exports = {
  dateTimeStr,
  loadSystemTime,
  time_select1,
  submit_form,
  getDepartment_list,
  navigateTo,
  redirectTo,
  successToShow,
  errorToShow,
  loadToShow,
  loadToHide,
  validateUsername,
  validatePassword,
  validateOldPassword,
  validateSamePassword,
  valSamePassword
}
