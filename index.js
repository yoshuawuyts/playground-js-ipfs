const mutate = require('xtend/mutable')
const notify = require('pull-notify')
const eos = require('end-of-stream')
const assert = require('assert')
const Ipfs = require('ipfs')

module.exports = init

// configure IPFS
// (str, obj?, cb) -> null
function init (repoPath, opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }

  assert.equal(typeof repoPath, 'string', 'ipfs: repoPath should be a string')
  assert.equal(typeof opts, 'object', 'ipfs: opts should be a string')
  assert.equal(typeof cb, 'function', 'ipfs: cb should be a string')

  initIpfs(repoPath, opts, function (err, node) {
    if (err) return cb(err)
    const _node = node

    const struct = {
      _node: _node,
      files: {
        cat: cat
      }
    }

    cb(null, struct)

    // cat a file from ipfs
    // str -> source$
    function cat (hash) {
      assert.equal(typeof hash, 'string', 'ipfs.files.cat: hash should be a string')
      const file$ = notify()

      _node.files.cat(hash, function (err, file) {
        if (err) return file$.abort(err)

        file.on('data', function (data) {
          file$(String(data))
        })
        eos(file, function (err) {
          if (err) return file$.abort(err)
          file$.end()
        })
      })

      return file$.listen()
    }
  })
}

// (str, obj, fn(err?, obj?)) -> null
function initIpfs (repoPath, opts, cb) {
  const _node = new Ipfs(repoPath)

  _node.init({}, function (err) {
    if (err) return cb(err)

    _node._repo.config.get(function (err, config) {
      if (err) return cb(err)

      // update config
      Object.keys(config).forEach(function (key) {
        if (opts[key]) mutate(config[key], opts[key])
      })

      _node._repo.config.set(config, function (err) {
        if (err) return cb(err)

        _node.load((err) => {
          if (err) return cb(err)
          _node.goOnline((err) => {
            if (err) return cb(err)
            cb(null, _node)
          })
        })
      })
    })
  })
}
