function dateTimeStr(timestamp) {
  const timeFormat = uni.$u.timeFormat;
  return timeFormat(timestamp, 'yyyy-mm-dd hh:MM');
}

function loadSystemTime(model) {
  var date = Math.round(new Date() / 1000)
  model.time = date
  model.time_display = dateTimeStr(date)
}

function time_select1(model, model1, value) {
  model1.time = Math.round(value / 1000)
  model1.time_display = dateTimeStr(model1.time)
  model.time_picker = false
  return model1.time
}

function submit_form(target_url, form) {
  console.log(form)
}


module.exports = {
  dateTimeStr,
  loadSystemTime,
  time_select1,
  submit_form
}
