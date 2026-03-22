const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
 user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
 id:{
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    img:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('product', ProductSchema);