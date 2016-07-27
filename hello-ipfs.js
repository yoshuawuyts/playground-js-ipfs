const IPFS = require('ipfs')
const os = require('os')
const repoPath = os.tmpdir() + '/' + Math.random()

const node = new IPFS(repoPath)

node.init({}, (err) => {
  if (err) { throw err }

  node._repo.config.get((err, config) => {
    if (err) { throw err }

    console.log('config', config)

    // config.Addresses = {
    //   Swarm: [
    //     '/ip4/127.0.0.1/tcp/10000',
    //     '/ip4/127.0.0.1/tcp/20000/ws'
    //   ],
    //   API: '',
    //   Gateway: ''
    // }

    node._repo.config.set(config, (err) => {
      if (err) { throw err }

      node.load((err) => {
        if (err) { throw err }
        node.goOnline((err) => {
          if (err) { throw err }
          console.log('Node is online')
        })
      })
    })
  })
})
