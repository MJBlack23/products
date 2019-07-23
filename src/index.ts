import startServer from './server/WebServer'
import DataCache from './server/DataCache'

const THIRTY_MINUTES = 1000 * 60 * 30

async function main () {
  const dataStore = DataCache.create()

  // Get the initial data and cache it
  await dataStore.getProducts()

  // Update the cache every 30 minutes
  setInterval(async () => {
    await dataStore.getProducts()
  }, THIRTY_MINUTES)

  // Start the server
  startServer(dataStore)
}


main()