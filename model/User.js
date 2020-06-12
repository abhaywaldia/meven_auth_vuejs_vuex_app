const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Create the User Model

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users',userSchema)