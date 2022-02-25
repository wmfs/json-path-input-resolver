const jp = require('jsonpath')

const isObject = require('lodash.isobject')
const cloneDeep = require('lodash.clonedeep')

function isString (str) {
  if (str != null && typeof str.valueOf() === 'string') {
    return true
  }
  return false
}

const isJSONPath = p => isString(p) && p.length !== 0 && p[0] === '$'

function resolveInputPaths (input, template) {
  const clonedInput = cloneOrDefault(input)
  const clonedTemplate = cloneOrDefault(template)
  resolvePaths(clonedInput, clonedTemplate)
  return clonedTemplate
} // resolveInputPaths

function cloneOrDefault (obj) {
  return (isObject(obj)) ? cloneDeep(obj) : {}
} // cloneOrDefault

function resolvePaths (input, root) {
  if (!isObject(root)) return

  // TODO: Support string-paths inside arrays
  if (Array.isArray(root)) {
    root.forEach(element => resolvePaths(input, element))
    return
  }

  for (const [key, value] of Object.entries(root)) {
    if (isJSONPath(value)) {
      root[key] = jp.value(input, value)
    } else {
      resolvePaths(input, value)
    }
  } // for ...
} // resolvePaths

module.exports = resolveInputPaths
