const mongoose = require('mongoose')
const Schema = mongoose.Schema

let storeSchema = new Schema(
    {
        productId: {
            type: String,
            unique: true
        },
        productName :{
            type:String,
            default:'Product'
        },
        productCategory : {
            type:String,
            default :'Genaral'
        },
        isAvailable :{
            type: Boolean,
            default:true
        },
        description : {
            type:String,
            default:''
        },
        colorsAvailable : [],
        dateOfEntry :{
            type :  Date,
            default: Date.now
        },
        warrantyInYears : {
            type:Number,
            default:0
        },
        price :{
            type:Number,
            default:00
        }

    })

    mongoose.model('Store',storeSchema, 'storeCollection')

