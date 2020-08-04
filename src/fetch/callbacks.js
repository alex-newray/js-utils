export const onError = (response, reject, errorCallback) => {
  console.error('Error request', response)
  if (errorCallback!=undefined && typeof(errorCallback)=='function'){
    errorCallback(response)
  }
  reject(response)
}

export const onSuccess = (response, resolve, successCallback) => {
  if (successCallback!=undefined && typeof(successCallback)=='function') {
    const res = response.response
    if (res != undefined)
      successCallback(res)
    else
      console.error('response is undefined')
  }
  resolve(response);
}

export const onDone = (response, resolve, doneCallback) => {
  if (doneCallback!=undefined && typeof(doneCallback)=='function'){
    doneCallback(response)
  }
  resolve(response);
}
