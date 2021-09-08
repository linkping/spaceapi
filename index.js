'use strict'

import express from 'express'
import cors from 'cors'
import http from 'http'
import level from 'level'
import rc from './rc.js'
import log from './log.js'

// TODO hook up mqtt to set open state

async function start () {
  const app = express()
  const server = await http.createServer(app)
  const db = level(rc.spaceapi.db, { valueEncoding: 'json' })

  app.set('x-powered-by', false)
  app.use(cors())

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
      // TODO update logo, using shackspace logo for now just to test json schema
      logo: 'http://rescue.shackspace.de/images/logo_shack_brightbg_highres.png',
      // TODO returning docs page for now, change to real homepage later
      url: 'https://docs.linkping.org',
      location: {
        address: 'Snickaregatan 16, Linköping, Sweden',
        // TODO update using coordinates from https://wiki.hackerspaces.org/LINKPing
        lat: 48.777,
        lon: 9.236,
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

  const { port } = rc.spaceapi
  server.listen(port, () => log.info(`server listening on port ${port}`))
}

start()
