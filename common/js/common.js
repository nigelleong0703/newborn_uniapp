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

module.exports = {
  dateTimeStr,
  loadSystemTime,
  time_select1,
  submit_form,
  getDepartment_list
}
