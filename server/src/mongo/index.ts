import {options, url} from '../config'

import mongoose from 'mongoose'

function connector(): void {
  mongoose.connect(url, options, function (error) {
    if (error) {
      console.error('Initial connection error:', error.name)
    }
  })

  const db = mongoose.connection
  db.once('open', () => {
    console.log('    🍃 MongoDB connected:', url)
  })
  db.once('disconnected', () => {
    console.warn('Mongoose lost connection to the MongoDB server')
  })
  db.once('reconnected', () => {
    console.info('Mongoose successfully reconnected')
  })
  db.once('close', () => {
    console.info('Mongoose successfully closes the connection')
  })

  db.on('error', err => {
    console.error('Connection error:', err.message)
  })
}

export {connector}
