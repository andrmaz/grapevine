import {ConnectOptions} from 'mongoose'

export const url = process.env.DB_URL || 'mongodb://localhost:27018'

export const options: ConnectOptions = {
  dbName: process.env.DB_NAME,
  user: process.env.AUTH_USER,
  pass: process.env.AUTH_PASS,
}
