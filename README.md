# playground-js-ipfs
A little experiment to showcase what the `js-ipfs` API could look like using
`pull-stream`. It supports full backpressure, propogation of errors and
propagation of cancellation, and can gracefully be degraded to any paradigm
subset.

## example init
Initialize a node
```js
const ipfs = require('ipfs')

ipfs('/my-cool/repo-name', (err, node) => {
  if (err) throw err
  console.log('node is online')
})
```

## example cat
Read a file from IPFS and stream it to `stdout`
```js
const pull = require('pull-stream')
const ipfs = require('ipfs')

ipfs('/my-cool/repo-name', (err, node) => {
  if (err) throw err
  const cat$ = node.files.cat('<hash>')
  pull(cat$, pull.log())
})
```

## License
[MIT](https://tldrlegal.com/license/mit-license)
