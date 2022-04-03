import mongoose from 'mongoose'

export const messageSchema = new mongoose.Schema({
  author: {type: String, required: true},
  content: {type: String, required: true},
})

export const MessageModel = mongoose.model('Message', messageSchema)
