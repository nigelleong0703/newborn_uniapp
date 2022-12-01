const toast = str => {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title: str,
      icon: "none",
      duration: 2000,
      success: () => {
        setTimeout(() => {
          resolve
        }, 2000)
      }
    })
  })
};

const successToast = str => {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title: str,
      icon: "success",
      duration: 2000,
      success: () => {
        setTimeout(() => {
          resolve()
        }, 2000)
      }
    })
  })
};

const showLoading = () => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      success: () => {
        resolve()
      }
    })
  })
};

const tipLoading = str => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: str,
      success: () => {
        resolve()
      }
    })
  })
};

const hideLoading = () => {
  return new Promise((resolve, reject) => {
    uni.hideLoading({
      success: () => {
        resolve()
      }
    })
  })
};

export default {
  toast: toast,
  successToast: successToast,
  showLoading: showLoading,
  tipLoading: tipLoading,
  hideLoading: hideLoading,
}
