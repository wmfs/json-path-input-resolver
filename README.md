# json-path-input-resolver
[![Tymly Package](https://img.shields.io/badge/tymly-package-blue.svg)](https://tymly.io/) [![npm (scoped)](https://img.shields.io/npm/v/@wmfs/json-path-input-resolver.svg)](https://www.npmjs.com/package/@wmfs/json-path-input-resolver) [![CircleCI](https://circleci.com/gh/wmfs/json-path-input-resolver.svg?style=svg)](https://circleci.com/gh/wmfs/json-path-input-resolver) [![codecov](https://codecov.io/gh/wmfs/json-path-input-resolver/branch/master/graph/badge.svg)](https://codecov.io/gh/wmfs/json-path-input-resolver) [![CodeFactor](https://www.codefactor.io/repository/github/wmfs/json-path-input-resolver/badge)](https://www.codefactor.io/repository/github/wmfs/json-path-input-resolver) [![Dependabot badge](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/wmfs/tymly/blob/master/packages/pg-concat/LICENSE)
> Resolve a template containing [JSONPath](https://www.npmjs.com/package/jsonpath) with some given JSON input data

## <a name="install"></a>Install
```bash
$ npm install @wmfs/json-path-input-resolver --save
```

## <a name="usage"></a>Usage
```javascript
const resolver = require('@wmfs/json-path-input-resolver')
const result = resolver(
  {
    world: 'Earth',
    nested: {
      object: 'Yep, this one!'
    },
    item1: 'Apple',
    item2: 'Banana'
  },
  {
    hello: '$.world',
    array: ['$.item1', '$.item2'],
    nested: {
      another: '$.nested.object'
    }
  }
)
```

`result` will look like the following:
```json
{
  "hello": "Earth",
  "array": ["Apple", "Banana"],
  "nested": {
    "another": "Yep, this one!"
  }
}
```

## <a name="tests"></a>Tests
```bash
$ npm test
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/tymly/packages/json-path-input-resolver/blob/master/LICENSE)
