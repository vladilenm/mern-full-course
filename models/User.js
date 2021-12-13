const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  date: {type: Date, default: Date.now},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},  
  apiPub: {type: String, required: true},
  apiSec: {type: String, required: true},
  traider: {type: String, required: true, unique: false},
  startTrading: {type: String, required: true},
  balance: {type: String, required: true},
  access: {type: String, required: true},
  links: [{ type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('User', schema)
