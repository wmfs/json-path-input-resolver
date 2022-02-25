/* eslint-env mocha */

'use strict'

const chai = require('chai')
const expect = chai.expect

const resolver = require('./../lib')

const tests = [
  {
    input: {
      world: 'Earth',
      nested: {
        object: 'Yep, this one!'
      },
      item1: 'Apple',
      item2: 'Banana'
    },
    template: {
      hello: '$.world',
      array: ['$.item1', '$.item2'],
      nested: {
        another: '$.nested.object'
      }
    },
    expected: {
      hello: 'Earth',
      array: ['Apple', 'Banana'],
      nested: {
        another: 'Yep, this one!'
      }
    }
  }
]

describe('Resolver tests', () => {
  tests.forEach(({ input, template, expected }) => {
    it('test', () => {
      const result = resolver(input, template)
      expect(result).to.eql(expected)
    })
  })
})
