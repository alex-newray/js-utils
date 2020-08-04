
export const setFormData = (data) => {
  let body = new FormData()
  for (let i in data){
    let value = data[i];
    if (value!=undefined){
      if (typeof(value) !== 'string') {
          value = JSON.stringify(value);
      }
      body.append(i, value);
    }
  }
  return body
}

export const unicodeParams = (data) => {
  let url = []
  for (let k in data){
    if (data[k] && data[k]!=undefined)
      url.push( encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) )
  }
  return url.join('&')
}
