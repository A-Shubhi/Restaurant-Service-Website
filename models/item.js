const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    
    price: {
        type: String,
        required:true
    },

    image:{
        type:String
    }
    
}, {timestamps: true});

const Item = mongoose.model('items', itemSchema);
module.exports = Item;