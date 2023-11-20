import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { db } from "../utils/db.js";
import gridfs from "gridfs-stream";
import { ObjectId } from "mongodb";

const authRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const gfs = gridfs(db, ObjectId);

authRouter.post("/register", upload.single("avatar"), async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const collection = db.collection("users");
    const result = await collection.insertOne(user);

    // Upload avatar to GridFS
    const avatarWriteStream = gfs.createWriteStream({
      filename: `avatar_${result.insertedId}`,
    });

    avatarWriteStream.write(req.file.buffer);
    avatarWriteStream.end();

    avatarWriteStream.on("finish", () => {
      return res.json({
        message: "User has been created successfully",
      });
    });

    avatarWriteStream.on("error", (error) => {
      console.error("Error uploading avatar to GridFS:", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

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
