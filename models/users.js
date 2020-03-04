const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema ({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transactions'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User
