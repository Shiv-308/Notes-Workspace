import mongoose, { Schema } from "mongoose";

const NotesSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  content : {
    type:String,
    required:true
  },
  tenantId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Tenanat"
  },
  userId : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
})

const Notes = mongoose.model("Notes",NotesSchema);

export default Notes;