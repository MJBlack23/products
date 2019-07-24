import startServer from './server/WebServer'
import DataCache from './server/DataCache'

const FIFTEEN_MINUTES = 1000 * 60 * 15

async function main () {
  const dataStore = DataCache.create()

  // Refresh cache every 15 minutes
  setInterval(() => {
    dataStore.clearCache()
  }, FIFTEEN_MINUTES)

  // Get the initial data and cache it
  await dataStore.getProducts()

  // Start the server
  startServer(dataStore)
}


main()