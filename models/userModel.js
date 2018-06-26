const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema (
    {
        userName :{
            type:String,
            unique:true
        },
        password :{
            type:String,
            unique:true
        },
        cartItems :[],
        cartCount :{
            type:Number,
            default : 0
        }
    })

    mongoose.model('User',userSchema,'userCollection')
