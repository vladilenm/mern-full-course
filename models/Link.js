const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    clicks: {
        type: Number,
        default: 0
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        index: true
    }
});

schema.index({ owner: 1, from: 1 }, { unique: true })

module.exports = model('Link', schema)
