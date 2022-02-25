/* eslint-env mocha */

'use strict'

const chai = require('chai')
const expect = chai.expect

const resolver = require('./../lib')

const tests = [
  {
    input: {
      case: {
        id: 'ID-1234'
      }
    },
    template: {
      filter: {
        where: {
          caseId: {
            equals: '$.case.id'
          }
        },
        orderBy: ['-created']
      }
    },
    expected: {
      filter: {
        where: {
          caseId: {
            equals: 'ID-1234'
          }
        },
        orderBy: ['-created']
      }
    }
  },
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
  tests.forEach(({ input, template, expected }, i) => {
    it(`Test ${i + 1}`, () => {
      const result = resolver(input, template)
      expect(result).to.eql(expected)
    })
  })
})
