# playground-js-ipfs

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
  const cat$ = ipfs.files.cat('<hash>')
  pull(cat$, pull.log())
})
```

## License
[MIT](https://tldrlegal.com/license/mit-license)
