const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname : String,
    email : String,
    password : String,
    isAdmin : Boolean,
    cart : [{ 
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'product' 
    }],
    orders : [{ 
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'product' 
    }],
    contactNo : String,
    picture : String
});

module.exports = mongoose.model('user', userSchema);