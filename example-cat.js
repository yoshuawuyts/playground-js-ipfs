const ipfs = require('./lol-wrap-ipfs.js')
const pull = require('pull-stream')
const os = require('os')

const hash = 'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB'
const repoPath = os.tmpdir() + '/' + Math.random()

const opts = {
  Addresses: {
    Swarm: [ '/ip4/127.0.0.1/tcp/10000', '/ip4/127.0.0.1/tcp/20000/ws' ],
    API: '',
    Gateway: ''
  }
}

ipfs(repoPath, opts, (err, node) => {
  if (err) throw err
  const cat$ = node.files.cat(hash)
  pull(cat$, pull.log())
})
