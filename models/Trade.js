const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    date: {type: Date, default: Date.now},
    tick: {type: String, required: true},
    blnUsdt: {type: String, required: true}, 
    email: {type: String, required: true},    
    links: [{ type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('Trade', schema)