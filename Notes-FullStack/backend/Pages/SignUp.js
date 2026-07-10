import express from "express";
import jwt from "jsonwebtoken";
import User from "../db/userSchema.js";
import bcrypt from "bcrypt";
import { zodSignUp } from "../types.js";

const SignUp = async (req, res) => {
  const parseResult = zodSignUp.safeParse(req.body);
if(!parseResult){
  return res.status(404).json({
   errors: parseResult.error.errors,
  });
}

  const { email, password,tenantId } = parseResult.data;

  if (!email || !password || !tenantId) {
    return res.status(400).json({
      message: "Please fill all the credentials",
    });
  }

  const check =await User.findOne({email});
  if (check) {
    return res.status(401).json({
      message: "An account have been found with the email .Please Login!",
    });
  }

  const bpassword = await bcrypt.hash(password, 10);

  const createUser = await User.create({
    email:email,
    password:bpassword,
    tenantId:tenantId
  });
  const token = jwt.sign({userId:createUser._id, email:email,tenantId:tenantId,role:createUser.role}, "Secret", { expiresIn: "1hr" });


  return res.status(200).json({
    token: token,
     user:{email :createUser.email, userId:createUser._id,tenantId:createUser.tenantId,role:createUser.role}
  });
};

export default SignUp;
