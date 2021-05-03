const http = require('http')
const debug = require('debug')
const app = require('../app')

debug('backend:server')

const port = normalizePort(process.env.PORT || '3000')

app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  const result = parseInt(val, 10)

  if (Number.isNaN(result)) {
    return val
  }

  if (result >= 0) {
    return result
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      return process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      return process.exit(1)
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}
