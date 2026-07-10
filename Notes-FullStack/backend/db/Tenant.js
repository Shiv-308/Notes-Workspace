import mongoose from "mongoose";


const tenantSchema = new mongoose.Schema({
email : {
  type:String,
  required:true,
  unique:true
},
password:{
  type:String,
  required:true
},
 role:{
    type:String,
    required:true,
    enum:["admin","user"],
    default:"admin"
  },
})

const Tenant = mongoose.model("Tenanat",tenantSchema);

export default Tenant;