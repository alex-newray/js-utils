import Promise from 'bluebird'
import uuidv4 from 'uuid/v4'

import getOption from './options'
import {setFormData, unicodeParams} from './forms'
import {onError, onSuccess, onDone} from './callbacks'

const debug = false;

Promise.config({
    warnings: debug,
    cancellation: true,
})

let promises = {}
let timeoutID;


const fetch = (_url, options = {}, _id) => {
    const id = (_id != undefined)? _id : uuidv4()
    const params = getOption(options)

    if (id!=false){
      if (promises[id] != undefined && params.method == 'GET') {
          if (params.noUniq) {
              return promises[id];
          }
          clearTimeout(timeoutID);
          promises[id].cancel();
      }
    }


    let url = (_url!=undefined) ? _url : params.url


    const promise = new Promise(function(resolve, reject, onCancel) {
        var timeoutItemId;
        var xhrResponse;
        var startTime = Date.now()

        const errorCallback = (e, iter) => {
          let endTime = Date.now()
          if (iter > 1 && (endTime - startTime < params.timeoutOverall)) {
              timeoutID = setTimeout(function() {
                  wrappedFetch(--iter, params.timeoutOverall - (endTime-startTime));
              }, params.interval);
          }
          else {
            onError(xhrResponse, reject, options.error)
          }
        }

        const wrappedFetch = (iter, timeoutRemainder) => {
            let xhr = new XMLHttpRequest()
            if (params.cache==false){
                params.data['_'] = Date.now()
            }
            let body = params.body
            let queryUrl = url
            if (params.data!=undefined && Object.keys(params.data).length!=0) {
                if (params.method=="POST") {
                    body = setFormData(params.data)
                } else {
                    queryUrl = url + '?' + unicodeParams(params.data)
                }
            }
            xhr.open(params.method, queryUrl, true)
            xhr.responseType = params.responseType;

            try {
                xhr.withCredentials = params.withCredentials
            } catch (e){
                console.error(e)
            }

            xhr.onload = function(e, data){
                xhrResponse = this
                clearTimeout(timeoutItemId);
                onDone(this, resolve, options.done)
                if (this.status==200) {
                  onSuccess(xhrResponse, resolve, options.success)
                } else {
                  if (this.status < 500)
                    onError(xhrResponse, reject, options.error)
                  else
                    errorCallback({url: url, reason: 'bad status', attempts: iter, response: xhrResponse}, iter)
                }
            }
            xhr.onabort = function(e) {
                clearTimeout(timeoutItemId);
            }
            xhr.onerror = function(e) {
                clearTimeout(timeoutItemId);
                errorCallback({url: url, reason: 'bad status', attempts: iter, response: e.target.response}, iter)
            }
            onCancel(function() {
                xhr.abort();
            })

            if (params.timeoutItem!=0){
                timeoutItemId = setTimeout(() => {
                    xhr.abort();
                    console.error('Error: abort request')
                    errorCallback({url:url, reason: 'abort', attempts: iter}, iter);
                }, timeoutRemainder < params.timeoutItem ? timeoutRemainder : params.timeoutItem);
            }

            xhr.send(body)
        }
        wrappedFetch(params.retries, params.timeoutOverall)
    })

    if (id!=false){
      promises[id] = promise
    }

    return promise;
}

export default fetch
