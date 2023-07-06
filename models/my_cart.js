const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const my_cartSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    
    item_name:{
        type: String,
        required:true
    },

    item_price: {
        type: String,
        required:true
    },

    quantity:{
        type:String,
        required:true
    }
    
}, {timestamps: true});

const My_cart = mongoose.model('my_carts', my_cartSchema);
module.exports = My_cart;