# playground-js-ipfs

## example simple mode
```js
const ipfs = require('ipfs')

const createNode = ipfs('/my-cool/repo-name')
createNode((err, node) => {
  if (err) throw err
  console.log('node is online')
})
```

## example cat
```js
const pull = require('pull-stream')
const ipfs = require('ipfs')

const createNode = ipfs('/my-cool/repo-name')
createNode((err, node) => {
  if (err) throw err
  const cat$ = ipfs.files.cat('<hash>')
  pull(cat$, pull.log())
})
```

## License
[MIT](https://tldrlegal.com/license/mit-license)
