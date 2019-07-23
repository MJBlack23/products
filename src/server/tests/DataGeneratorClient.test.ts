import DataCache from '../DataGeneratorClient'

import { Product, Products } from '../DataGeneratorClient'
import { expect } from 'chai'

describe('DataGeneratorClient', () => {
  it('getProducts should return a list of products', async () => {
    const dataStore = DataCache.create()

    const products: Products = [
      {
        "_id": "abc",
        "guid": "074f7b84-13a8-4fa3-ba1a-0ffef59dc7c4",
        "isActive": false,
        "name": "Ex amet aliqua nisi Lorem quis magna nisi eiusmod veniam.",
        "price": "183.23",
        "image": "https://picsum.photos/300/300/?random",
        "about": "Officia dolor commodo et pariatur officia aliquip deserunt duis voluptate ex occaecat occaecat laboris. Aliqua aliquip velit irure reprehenderit. Commodo culpa reprehenderit nisi mollit qui. Amet ut ex incididunt amet minim aute excepteur est do id cillum. Nostrud adipisicing qui anim sunt ipsum fugiat quis in consectetur proident. Est minim aliqua irure cillum tempor.",
        "registered": "Saturday, October 21, 2017 2:52 AM",
        "latitude": "-6.457583",
        "longitude": "52.869909",
        "tags": [
          "id",
          "id",
          "aliqua",
          "dolore",
          "dolore"
        ]
      },
    ]

    const dataSource = () => Promise.resolve(products)

    dataStore.setDataSource(dataSource)

    try {
      const products = await dataStore.getProducts()

      expect(products).to.have.length(1)
      expect(products[0]._id).to.equal('abc')
    } catch (e) {
      throw e;
    }
  })

  it('getItemById should return an item by it\'s Id', async () => {
    const dataSource = () => Promise.resolve([
      {
        "_id": "5c58693b2f3b8ac746a18f85",
        "guid": "074f7b84-13a8-4fa3-ba1a-0ffef59dc7c4",
        "isActive": false,
        "name": "Ex amet aliqua nisi Lorem quis magna nisi eiusmod veniam.",
        "price": "183.23",
        "image": "https://picsum.photos/300/300/?random",
        "about": "Officia dolor commodo et pariatur officia aliquip deserunt duis voluptate ex occaecat occaecat laboris. Aliqua aliquip velit irure reprehenderit. Commodo culpa reprehenderit nisi mollit qui. Amet ut ex incididunt amet minim aute excepteur est do id cillum. Nostrud adipisicing qui anim sunt ipsum fugiat quis in consectetur proident. Est minim aliqua irure cillum tempor.",
        "registered": "Saturday, October 21, 2017 2:52 AM",
        "latitude": "-6.457583",
        "longitude": "52.869909",
        "tags": [
          "id",
          "id",
          "aliqua",
          "dolore",
          "dolore"
        ]
      },
      {
        "_id": "5c58693bf4e96a987d24c075",
        "guid": "0299d704-3d83-4936-80db-37d7d8ff16b8",
        "isActive": false,
        "name": "Laborum irure aute aute enim deserunt culpa sunt esse.",
        "price": "13.77",
        "image": "https://picsum.photos/300/300/?random",
        "about": "Eiusmod in ipsum est incididunt eiusmod culpa pariatur sunt ex laboris nulla dolore laboris aute. Aute qui nulla minim proident esse adipisicing incididunt. Labore cupidatat minim amet dolore. In et laboris et magna reprehenderit Lorem tempor tempor enim qui duis id est ex. Cillum voluptate id esse Lorem aute consectetur officia proident. Id enim sint nostrud cupidatat ad minim officia do quis occaecat aute pariatur aliqua.",
        "registered": "Friday, August 22, 2014 4:07 AM",
        "latitude": "-24.795495",
        "longitude": "52.547493",
        "tags": [
          "occaecat",
          "occaecat",
          "reprehenderit",
          "excepteur",
          "eiusmod"
        ]
      },
    ])


    const dataStore = DataCache.create()

    dataStore.setDataSource(dataSource)

    try {
      const product = await dataStore.getItemById('5c58693b2f3b8ac746a18f85')

      expect(product).to.eql((await dataSource())[0])
    } catch (error) {
      throw error
    }
  })

  it('searchProducts should return a list of products matching by name or tag', async () => {
    const dataSource = () => Promise.resolve([
      {
        "_id": "5c58693b2f3b8ac746a18f85",
        "guid": "074f7b84-13a8-4fa3-ba1a-0ffef59dc7c4",
        "isActive": false,
        "name": "Cool stuff",
        "price": "183.23",
        "image": "https://picsum.photos/300/300/?random",
        "about": "Officia dolor commodo et pariatur officia aliquip deserunt duis voluptate ex occaecat occaecat laboris. Aliqua aliquip velit irure reprehenderit. Commodo culpa reprehenderit nisi mollit qui. Amet ut ex incididunt amet minim aute excepteur est do id cillum. Nostrud adipisicing qui anim sunt ipsum fugiat quis in consectetur proident. Est minim aliqua irure cillum tempor.",
        "registered": "Saturday, October 21, 2017 2:52 AM",
        "latitude": "-6.457583",
        "longitude": "52.869909",
        "tags": [
          "id",
          "id",
          "aliqua",
          "dolore",
          "dolore"
        ]
      },
      {
        "_id": "5c58693bf4e96a987d24c075",
        "guid": "0299d704-3d83-4936-80db-37d7d8ff16b8",
        "isActive": false,
        "name": "Laborum irure aute aute enim deserunt culpa sunt esse.",
        "price": "13.77",
        "image": "https://picsum.photos/300/300/?random",
        "about": "Eiusmod in ipsum est incididunt eiusmod culpa pariatur sunt ex laboris nulla dolore laboris aute. Aute qui nulla minim proident esse adipisicing incididunt. Labore cupidatat minim amet dolore. In et laboris et magna reprehenderit Lorem tempor tempor enim qui duis id est ex. Cillum voluptate id esse Lorem aute consectetur officia proident. Id enim sint nostrud cupidatat ad minim officia do quis occaecat aute pariatur aliqua.",
        "registered": "Friday, August 22, 2014 4:07 AM",
        "latitude": "-24.795495",
        "longitude": "52.547493",
        "tags": [
          "occaecat",
          "occaecat",
          "reprehenderit",
          "excepteur",
          "eiusmod"
        ]
      },
      {
        "_id": "5c58693bd8fa9f8a04341e30",
        "guid": "db5e2efc-70ed-404b-9c60-8c5d2079e32f",
        "isActive": false,
        "name": "Cupidatat tempor duis voluptate laborum incididunt incididunt qui pariatur proident est aliqua enim.",
        "price": "19.32",
        "image": "https://picsum.photos/300/300/?random",
        "about": "Aliquip irure mollit nostrud do esse non non reprehenderit consequat pariatur voluptate. Labore qui do ex eu nisi in sunt anim sunt veniam minim. Pariatur laboris veniam magna aliqua ut reprehenderit eiusmod Lorem pariatur ut duis qui consectetur. Sint voluptate sunt incididunt proident magna aliquip nisi sint culpa. Est nostrud id eiusmod labore irure laboris Lorem id esse enim qui commodo. Deserunt quis ea mollit qui dolor anim duis ullamco reprehenderit ad irure nisi.",
        "registered": "Friday, October 6, 2017 8:50 PM",
        "latitude": "28.295232",
        "longitude": "-95.042068",
        "tags": [
          "cool",
          "minim",
          "veniam",
          "sint",
          "dolor"
        ]
      },
      {
        "_id": "5c58693b50db2356eee04287",
        "guid": "63d9b0ef-af8d-4247-8c1b-fac482b83766",
        "isActive": true,
        "name": "Nulla aliquip velit anim labore pariatur eu sit excepteur sit aliqua ex ex occaecat excepteur.",
        "price": "154.13",
        "image": "https://picsum.photos/300/300/?random",
        "about": "Ipsum veniam consequat excepteur in incididunt sit. Duis do exercitation et ad. Commodo anim proident tempor reprehenderit.",
        "registered": "Sunday, August 27, 2017 12:22 AM",
        "latitude": "71.505011",
        "longitude": "-24.821838",
        "tags": [
          "pariatur",
          "aliquip",
          "sit",
          "et",
          "aute"
        ]
      },
    ])

    const dataStore = DataCache.create()

    dataStore.setDataSource(dataSource)

    try {
      const products = await dataStore.searchProducts('COOL')

      expect(products).to.have.length(2)
      expect(products.find(p => p._id === "5c58693b2f3b8ac746a18f85")).to.exist
      expect(products.find(p => p._id === "5c58693bd8fa9f8a04341e30")).to.exist
    } catch (error) {
      throw error
    }
  })
})