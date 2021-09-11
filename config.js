import rc from 'rc'

export default rc('linkping', {
  spaceapi: {
    port: 4000,
    db: './db'
  },
  mqtt: {
    host: 'localhost',
    port: 1883,
    username: 'linkping-mqtt-user',
    password: 'fakepass'
  }
})
