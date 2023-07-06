const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    pname: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    pword: {
        type: String,
        required:true
    },
    email: {
        type: String,
    }
    
}, {timestamps: true});

const User = mongoose.model('users', userSchema);
module.exports = User;