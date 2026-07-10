import mongoose from "mongoose";

const url =  "mongodb://127.0.0.1:27017/Users";


const connnectDb = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => console.log(e,"error"));
mongoose.connection.on("connected", () => console.log("connected"));

export default connnectDb;
