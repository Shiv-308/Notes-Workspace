import jwt from "jsonwebtoken";
import User from "../db/userSchema.js";
import bcrypt from "bcrypt";
import { zodLogin } from "../types.js";

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: "Please enter all the required credentials",
    });
  }
  const user = await User.findOne({ email: email }).populate("tenantId");
  console.log(user)
  if (!user) {
    return res.status(400).json({
      message: "NO such user exist",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({
      message: "Invalid  Password",
    });

  const token = jwt.sign({ userId:user._id,tenantId:user.tenantId?._id,role:user.role  }, "Secret", { expiresIn: "1hr" });
  if (!token) {
    return res.status(404).json({
      message: "Invalid Token found!",
    });
  }

  return res.json({
    message:"Login successfully",
    token,
    user: { email: user.email, role: user.role ,tenantId:user.tenantId._id},
  });
};

export default Login;
