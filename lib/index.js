const isObject = require('lodash.isobject')
const cloneDeep = require('lodash.clonedeep')
const jp = require('jsonpath')

function isString (str) {
  if (str != null && typeof str.valueOf() === 'string') {
    return true
  }
  return false
}

module.exports = (input, template) => {
  const cloneOrDefault = obj => isObject(obj) ? cloneDeep(obj) : {}
  const isJSONPath = p => isString(p) && p.length !== 0 && p[0] === '$'
  const isJSONPathQuery = p => isString(p) && p.trim().length !== 0 && p.split('.$q').length > 1
  const resolvePaths = (input, root) => {
    if (!isObject(root)) return

    if (Array.isArray(root)) {
      root.forEach((element, i) => {
        root[i] = resolvePaths(input, element)
      })
      return
    }

    for (const [key, value] of Object.entries(root)) {
      if (isJSONPath(value)) {
        if (isJSONPathQuery(key)) {
          root[key.split('.$q')[0]] = jp.query(input, value)
          delete root[key]
        } else {
          root[key] = jp.value(input, value)
        }
      } else {
        resolvePaths(input, value)
      }
    }
  }

  const clonedInput = cloneOrDefault(input)
  const clonedTemplate = cloneOrDefault(template)

  console.log({clonedInput, clonedTemplate})
  resolvePaths(clonedInput, clonedTemplate)

  return clonedTemplate
}
