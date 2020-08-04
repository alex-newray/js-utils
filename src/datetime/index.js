import {getOption} from '../utils'

export const timestamp = (options) => {
  const milliseconds = getOption(options, 'milliseconds', false)
  const rounding = getOption(options, 'rounding', 0)

  let result = 0
  const date = Date.now() / 1000
  if (milliseconds === true){
    result = date
  } else {
    result = Math.floor(date)
  }
  if (rounding!=0){
    result = result - (result%rounding)
  }
  return result
}
