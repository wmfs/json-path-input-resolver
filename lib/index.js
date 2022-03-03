const jp = require('jsonpath')

const isObject = require('lodash.isobject')
const cloneDeep = require('lodash.clonedeep')

const isString = str => str !== null && typeof str.valueOf() === 'string'
const isJSONPath = p => isString(p) && p.trim().length !== 0 && p[0] === '$'
const isJSONPathQuery = p => isString(p) && p.trim().length !== 0 && p.split('.$q').length > 1
const cloneOrDefault = obj => isObject(obj) ? cloneDeep(obj) : {}

function resolveInputPaths (input, template) {
  const clonedInput = cloneOrDefault(input)
  const clonedTemplate = cloneOrDefault(template)
  resolvePaths(clonedInput, clonedTemplate)
  return clonedTemplate
} // resolveInputPaths

function resolvePaths (input, root) {
  if (!isObject(root)) return

  if (Array.isArray(root)) {
    root.forEach((element, i) => {
      if (typeof element === 'string') {
        root[i] = isJSONPath(element) ? jp.value(input, element) : element
      } else {
        root[i] = resolvePaths(input, element)
      }
    })
    return
  }

  for (const [key, value] of Object.entries(root)) {
    if (isJSONPathQuery(key)) {
      root[key.split('.$q')[0]] = jp.query(input, value)
      delete root[key]
      continue
    }

    if (typeof value === 'string') {
      root[key] = isJSONPath(value) ? jp.value(input, value) : value
      continue
    }

    resolvePaths(input, value)
  } // for ...

  return root
} // resolvePaths

module.exports = resolveInputPaths
