import jwt from "jsonwebtoken";
import Tenant from "../db/Tenant.js";
import bcrypt from "bcrypt";
import { zodLogin } from "../types.js";

const TenantLogin = async (req, res) => {

  const { email, password } =req.body;
  if (!email || !password) {
    return res.status(404).json({
      message: "Need all the credentials!",
    });
  }
  const FindUser = await Tenant.findOne({ email: email });
  if (!FindUser) {
    return res.status(404).json({
      message: "User Doesnot Exist!",
    });
  }

  const isMatch = await bcrypt.compare(password, FindUser.password);

  if (!isMatch) {
    return res.status(404).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    { tenantId: FindUser._id, email: email, role: FindUser.role },
    "Secret",
    { expiresIn: "1hr" }
  );

  if (!token) {
    return res.status(404).json({
      message: "Invalid Token Found",
    });
  }

  return res.json({
    message: "Tenant Login Successfully",
    token,
    user: {
      email: FindUser.email,
      role: FindUser.role,
      tenantId: FindUser._id,
    },
  });
};

export default TenantLogin;
