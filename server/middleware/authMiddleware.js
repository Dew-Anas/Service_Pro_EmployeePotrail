const jwt = require("jsonwebtoken");
const User = require("../dev-stubs/User");

exports.protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

exports.employeeOnly = (req, res, next) => {
  if (req.user.role !== "employee") {
    return res.status(403).json({ message: "Employee access only" });
  }
  next();
};