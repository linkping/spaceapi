'use strict'

import express from 'express'
import cors from 'cors'
import http from 'http'
import rc from './rc.js'
import log from './log.js'

async function start () {
  const app = express()
  const server = await http.createServer(app)

  app.set('x-powered-by', false)
  app.use(cors())

  app.route('/').get(async (req, res) => {
    res.json({
      beep: 'boop'
    })
  })

  server.listen(rc.spaceapi.port, () => {
    log.info(`server listening on port ${rc.spaceapi.port}`)
  })
}

start()
