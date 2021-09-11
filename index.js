'use strict'

import express from 'express'
import cors from 'cors'
import http from 'http'
import level from 'level'
import config from './config.js'
import log from './log.js'
import createMqttClient from './mqtt.js'

async function start () {
  const app = express()
  const server = await http.createServer(app)
  const db = level(config.spaceapi.db, { valueEncoding: 'json' })

  app.set('x-powered-by', false)
  app.use(cors())

  const mqtt = createMqttClient()

  mqtt.on('message', async (topic, message) => {
    if (topic === 'linkping/close') {
      await db.put('open', false)
    } else if (topic === 'linkping/open') {
      await db.put('open', true)
    }
  })

  const isOpen = async () => {
    try {
      return await db.get('open')
    } catch (e) {
      return false
    }
  }

  app.route('/').get(async (req, res) => {
    res.json({
      api_compatibility: ['14'],
      space: 'LINKping',
      logo: 'https://static.linkping.org/logo.png',
      url: 'https://docs.linkping.org',
      location: {
        address: 'Snickaregatan 16, Linköping, Sweden',
        lat: 58.412116,
        lon: 15.628053,
        timezone: 'SE'
      },
      contact: {
        email: 'ralphtheninja@riseup.net',
        irc: 'irc://irc.libera.chat/#linkping'
      },
      state: {
        open: await isOpen()
      }
    })
  })

  const { port } = config.spaceapi
  server.listen(port, () => log.info(`server listening on port ${port}`))
}

start()
