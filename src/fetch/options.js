import {getOption} from '../utils'

const optionsList = [
  {name:'retries', defaultValue:1},
  {name:'interval', defaultValue:1000},
  {name:'timeoutOverall', defaultValue:300000},
  {name:'timeoutItem', defaultValue:0},
  {name:'cache', defaultValue:true},
  {name:'withCredentials', defaultValue:true},
  {name:'noUniq', defaultValue:false},
  {name:'method', defaultValue:'GET'},
  {name:'url', defaultValue:''},
  {name:'responseType', defaultValue:''},
  {name:'data', defaultValue:{}},
  {name:'body', defaultValue:null},
]

export default (options) => {
  let result = {}
  for (let i in optionsList){
    let option = optionsList[i]
    result[option.name] = getOption(options, option.name, option.defaultValue)
  }
  return result
}
