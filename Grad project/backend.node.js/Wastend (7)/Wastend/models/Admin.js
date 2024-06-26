const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    Email: { 
        type: String ,
        required: true ,
        unique: [true, "Email must be unique"] 
    }
  , password:{
    type: String,
    required: true,
    minlength: [8, 'Password should have atleast 8 characters']
},
role:{
  type: String,
  enum: ['Admin', 'User', 'Supplier'],
  default: 'Admin',
  required: true
}
 
})
 const Admin = mongoose.model('Admin', adminSchema);
 module.exports = Admin;