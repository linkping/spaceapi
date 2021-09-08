const isDebug = process.env.DEBUG === 'linkping'
const noop = () => {}

function log (level) {
  return function (...args) {
    args.unshift('|')
    args.unshift((new Date()).toUTCString())
    args.unshift('|')
    args.unshift(level)
    args.unshift('|')
    args.unshift('spaceapi')
    console.log.apply(null, args)
  }
}

export default {
  info: log('INFO'),
  warn: log('WARNING'),
  error: log('ERROR'),
  debug: isDebug ? log('DEBUG') : noop
}
