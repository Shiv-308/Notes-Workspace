import express from "express"
import Login from "../Pages/Login.js"
import SignUp from "../Pages/SignUp.js"
import TenantSignup from "../Pages/TenantSignup.js";
import TenantLogin from "../Pages/TenantLogin.js";


const Router = express.Router();

Router.post("/login",Login);
Router.post("/Signup",SignUp);
Router.post("/TenantLogin",TenantLogin);
Router.post("/TenantSignup",TenantSignup);

export default Router;