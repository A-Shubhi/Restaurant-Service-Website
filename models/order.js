const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;