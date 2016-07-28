const ipfs = require('./lol-wrap-ipfs')
const os = require('os')

const repoPath = os.tmpdir() + '/' + Math.random()
ipfs(repoPath, (err, node) => {
  if (err) throw err
  console.log('node is online')
})
