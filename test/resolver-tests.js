/* eslint-env mocha */

'use strict'

const chai = require('chai')
const expect = chai.expect

const resolver = require('./../lib')

const tests = [
  {
    input: {
      selected: [
        { uprn: 1 },
        { uprn: 2 },
        { uprn: 3 }
      ]
    },
    template: {
      uprn: '$.uprn',
      numSelected: '$.selected.length',
      'selected.$q': '$.selected[*].uprn'
    },
    expected: {
      uprn: undefined,
      numSelected: 3,
      selected: [1, 2, 3]
    }
  },
  {
    input: {
      selected: [
        { uprn: 1 },
        {},
        { uprn: 3 }
      ]
    },
    template: {
      numSelected: '$.selected.length',
      'selected.$q': '$.selected[*].uprn'
    },
    expected: {
      numSelected: 3,
      selected: [1, 3]
    }
  },
  {
    input: {
      uprn: 123,
      addressLabel: '123 Red Road'
    },
    template: {
      key: '$.uprn',
      address: '$.addressLabel'
    },
    expected: {
      key: 123,
      address: '123 Red Road'
    }
  },
  {
    input: {
      uprn: '1234',
      counter: 9
    },
    template: {
      uprn: { equals: '$.uprn' },
      counter: { notEquals: '$.counter' }
    },
    expected: {
      uprn: { equals: '1234' },
      counter: { notEquals: 9 }
    }
  },
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
