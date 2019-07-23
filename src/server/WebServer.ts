import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as serve from 'koa-static'
import * as send from 'koa-send'
import DataCache from './DataCache'

const path = require('path')

const startServer = (dataStore: DataCache, port: number = 3000) => {
  const server = new Koa()
  const router = new Router()

  server.use(serve(path.join('public'), {
    gzip: true,
    index: 'index.html'
  }))

  router.get('/api/products', async (ctx: Koa.Context) => {
    const { q, start, max } = ctx.query

    if (!q) {
      ctx.body = await dataStore.getProducts(start, max)
    } else {
      ctx.body = await dataStore.searchProducts(q, start, max)
    }
  })

  router.get('/api/products/:id', async (ctx: Koa.Context) => {
    ctx.body = await dataStore.getItemById(ctx.params.id)
  })

  server.use(router.routes())

  server.use(function* index() {
    yield send(this, __dirname + '/index.html');
  })

  server.listen(port)

  console.log('Products server up and running on port', port)
}

export default startServer