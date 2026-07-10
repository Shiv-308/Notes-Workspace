import express from "express" 
import auth from "./Routing/auth.js"
import routes from "./Routing/endpoints.js"
import connnectDb from "./db/Connection.js";
import cors from "cors";

connnectDb;

const PORT = 3001;


const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/auth",auth); 
app.use("/notes",routes); 

app.get("/health",(req,res) => {
  return res.json({
    message:"Backend is running"
  })
})


app.listen(PORT,() => {
  console.log(`Server listening on http://localhost:${PORT}`);
})