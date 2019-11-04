import { resolve ***REMOVED*** from 'path'
import test from 'ava'
import { Nuxt, Builder ***REMOVED*** from 'nuxt'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null

// Init Nuxt.js and create a server listening on localhost:4000
test.before(async () => {
  const config = {
    dev: false,
    rootDir: resolve(__dirname, '../../')
***REMOVED***
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  await nuxt.server.listen(4000, 'localhost')
***REMOVED***, 30000)

// Example of testing only generated html
test('Route / exits and render HTML', async (t) => {
  const { html ***REMOVED*** = await nuxt.renderRoute('/', {***REMOVED***)
  t.true(html.includes('Documentation'))
***REMOVED***)

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', (t) => {
  nuxt.close()
***REMOVED***)
