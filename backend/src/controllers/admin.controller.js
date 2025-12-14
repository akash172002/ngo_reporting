import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * POST /api/admin/register
 */
export const registerAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ email, password });

    res.status(201).json({
      message: "Admin registered successfully",
      adminId: admin._id,
    });
  } catch (error) {
    next(error); // ✅ REQUIRED
  }
};

/**
 * POST /api/admin/login
 */
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    next(error); // ✅ REQUIRED
  }
};

/**
 * GET /api/admin/me
 */
export const getCurrentAdmin = async (req, res) => {
  res.json({
    adminId: req.adminId,
    message: "Admin authenticated",
  });
};
