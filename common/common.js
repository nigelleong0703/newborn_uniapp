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
  return uni.getStorageSync('department_list')
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
}
