/**
 * 封装fetch，用用于接口调用
 */

 // FormData对象用以将数据编译成键值对，以便用XMLHttpRequest来发送数据
 // 如果表单enctype属性设为multipart/form-data ，则会使用表单的submit()方法来发送数据，从而，发送数据具有同样形式
function toForm (data) {
  let formData = new FormData()
  let keyArr = Object.keys(data)
  if (keyArr.length < 1) {
    return {}
  }
  keyArr.map(item => {
    formData.append(item, data[item])
  })
  return formData
}

// 序列化
function toJsonStr (data) {
  return JSON.stringify(data)
}

function formData (headers, data) {
  if (!headers || !headers['Content-Type'] || headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    return toForm(data)
  }
  switch (headers['Content-Type']) {
    case 'application/json':
      return toJsonStr(data)
    default: 
      return toForm(data)
  }
}

export default httpReq = ({url, method, data, dataType, headers, success, error, complete}) => {
  let options = {}
  // 默认method
  options['method'] = method || 'GET'
  // 默认header
  options['headers'] = Object.assign({
    'Content-Type': 'application/x-www-form-urlencoded',
    'credentials': 'include', // 包含cookie
    'mode': 'cors'  //  允许跨域
  }, headers)

  fetch(url, options).then(response => {
    response.json()
  }).then(responseJson => {
    success && success(responseJson)
    complete && complete(responseJson)
  }).catch(err => {
    error && error(err)
    complete && complete(responseJson)
  })
}