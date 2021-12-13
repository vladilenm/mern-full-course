const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
//   date: {type: Date, default: Date.now},
//   token: {type: String, required: true},
//   quantity: {type: Number, default: 0},
//   price: {type: Number, default: 0},
//   trade: {type: String, required: true},
//   owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Office', schema)