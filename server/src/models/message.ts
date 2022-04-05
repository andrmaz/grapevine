import mongoose from 'mongoose'

export const messageSchema = new mongoose.Schema(
  {
    from: {type: String, required: true},
    to: {type: String, required: true},
    content: {type: String, required: true},
  },
  {timestamps: true}
)

export const MessageModel = mongoose.model('Message', messageSchema)
