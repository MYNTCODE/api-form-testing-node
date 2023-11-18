import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { db } from "../utils/db.js";

const authRouter = Router();

// กำหนดที่เก็บไฟล์อัปโหลด
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

authRouter.post("/register", upload.single("avatar"), async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    // เพิ่มข้อมูลไฟล์ที่อัปโหลดเข้าไปใน user
    avatar: req.file.buffer.toString("base64"),
  };

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const collection = db.collection("users");
  await collection.insertOne(user);

  return res.json({
    message: "User has been created successfully",
  });
});

// API เพื่อเอาไว้ Login ตัว User
authRouter.post("/login", async (req, res) => {
  const user = await db.collection("users").findOne({
    username: req.body.username,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(404).json({
      message: "password not valid",
    });
  }

  const token = jwt.sign(
    { id: user._id, firstName: user.firstName, lastName: user.lastName },
    process.env.SECRET_KEY,
    {
      expiresIn: "900000",
    }
  );

  return res.json({
    message: "Login successfully",
    token,
  });
});

export default authRouter;
