import startServer from './server/WebServer'
import DataCache from './server/DataCache'

async function main () {
  const dataStore = DataCache.create()

  // Get the initial data and cache it
  await dataStore.getProducts()

  // Start the server
  startServer(dataStore)
}


main()