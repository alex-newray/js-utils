export const getOption = (options, name, defaultValue) => {
  if (options == undefined)
    return defaultValue
  return (options[name]!=undefined) ? options[name] : defaultValue
}
