import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(404).json({
      message: "No token found",
    });
  try {
    const decoded = jwt.verify(token, "Secret");
    req.user = decoded; //here the req.user will store userId,tenantId,role which are the things stored while creating tokens
    next();
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};
export default authMiddleware;
