'use strict'

import express from 'express'
import http from 'http'
import rc from './rc.js'
import log from './log.js'

async function start () {
  const app = express()
  const server = await http.createServer(app)

  app.set('x-powered-by', false)

  app.route('/').get(async (req, res) => {
    console.log('in /')
    res.json({
      beep: 'boop'
    })
  })

  server.listen(rc.spaceapi.port, () => {
    log.info(`server listening on port ${rc.spaceapi.port}`)
  })
}

start()
