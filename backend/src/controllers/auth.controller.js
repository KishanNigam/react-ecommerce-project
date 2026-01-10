const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

exports.adminLogin = async (req, res) => {
   console.log("REQ BODY =>", req.body); // 👈 ADD THIS
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Identifier and password are required",
      });
    }

    // find by email OR username OR mobile
    const admin = await Admin.findOne({
      $or: [
        { email: identifier },
        { username: identifier },
        { mobile: identifier },
      ],
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
        mobile: admin.mobile,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
