const mongoose = require('mongoose');
const { Schema } = mongoose
const supplierSchema = new Schema({
    email: { 
        type: String ,
        required: true ,
        unique: [true, "Email must be unique"] 
    }, 
    password:{
         type: String,
         required: true,
         minlength: [8, 'Password should have atleast 8 characters']
    },
    phone: {
        type: String,
        required: true
    },
    city: {
       type: String,
       required: true
    },
    role:{
        type: String,
        required: true,
        enum: ['Admin', 'User', 'Supplier'],
        default:'Supplier'
    },
    store: {
        type: Schema.Types.ObjectId,
        ref:'Store',
},
    sales: {
    type: Number,
    defaultValue: 0,
    },   
    mealsSaved: {
        type: Number,
        defaultValue: 0,
        },  
})

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
