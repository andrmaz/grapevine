import mongoose, {ConnectOptions} from 'mongoose'

function connector(url: string, options: ConnectOptions): void {
  
  mongoose.connect(url, options, function cb(error) {
    if (error) {
      console.error('Initial connection error:', error.name)
    }
  })
  // get mongodb-shell friendly output (ISODate)
  mongoose.set('debug', {shell: true})
  // If an operation is buffered for more than 1m, throw an error.
  mongoose.set('bufferTimeoutMS', 60000)

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
