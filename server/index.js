const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const colorthief = require('colorthief')
const bodyParser = require('body-parser')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  const toHex = rgb => {
    return '#' + rgb.map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  app.get('/api/image', async (req, res) => {
    const { image } = req.query
    const colors = await colorthief.getColor(image)
    res.send(toHex(colors))
  })
  // Give nuxt middleware to express
  app.use(nuxt.render)




  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
