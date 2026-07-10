import Tenant from "../db/Tenant.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { zodLogin } from "../types.js";

const TenantSignup = async (req, res) => {
  const parseResult = zodLogin.safeParse(req.body);
  if(!parseResult){
    return res.status(404).json({
      errors:parseResult.errors.error
    })
  }
  const { email, password } = parseResult.data;
  if (!email || !password) {
    return res.status(404).json({
      message: "Need all credentials!",
    });
  }

  const Finduser = await Tenant.findOne({ email: email });
  if (Finduser) {
    return res.status(404).json({
      message: "User Found With this email",
    });
  }

  const HashPassword = await bcrypt.hash(password, 10);

  const createTenant = await Tenant.create({
    email: email,
    password: HashPassword
  });

  const token =  jwt.sign(
    { tenantId: createTenant._id, email: email,role:createTenant.role },
    "Secret",
    { expiresIn: "1hr" }
  );
  return res.status(200).json({
    message:"Tenant created Successfully",
    token,
    user:{email:createTenant.email,tenantId:createTenant._id,role:createTenant.role}
  })
 
};

export default TenantSignup;
