const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  tick: {type: String, required: true, unique: true},
  quantity: {type: String, required: true},
  kBalance: {type: String, required: true},  
  startLine: {type: String, required: true},
  stopLine: {type: String, required: true},  
  kBalanceStop: {type: String, required: true},
  hardStop: {type: String, required: true},
  flag: {type: String, required: true}
})

module.exports = model('Portfolio', schema)