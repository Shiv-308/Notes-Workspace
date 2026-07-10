import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  role:{
    type:String,
    required:true,
    enum:["admin","user"],
    default:"user"
  },
  password:{
    type:String,
    required:true
  },
  tenantId :{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Tenanat",
  }
});

const User = mongoose.model("User",userSchema);

export default User ;