import { Router } from "express";
import supabase from "../utils/supabase.js";
import bcrypt from "bcrypt";
import multer from "multer";
import jwt from "jsonwebtoken"; // npm install jsonwebtoken

const authRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

authRouter.get("/", async (req, res) => {
  try {
    const data = await supabase.from("users").select("*");
    return res.json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

authRouter.post("/register", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!file.originalname) {
      return res.status(400).json({ message: "Invalid file name" });
    }

    if (!file.buffer) {
      return res.status(400).json({ message: "Invalid file data" });
    }

    const user = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
      job_position: req.body.job_position,
      summary_title: req.body.summary_title,
      summary_description: req.body.summary_description,
      work_experience: req.body.work_experience,
      work_detail: req.body.work_detail,
      skill_title: req.body.skill_title,
      skill_detail: req.body.skill_detail,
      user_photo: file.originalname,
    };

    console.log("Received data from frontend:", user);

    // Upload file to Supabase storage
    const uploadResult = await supabase.storage
      .from("testing")
      .upload(`user_photo/${Date.now()}${file.originalname}`, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    console.log("uploadresult", uploadResult);
    if (!uploadResult.error) {
      const userPhotourl = `https://ryrmivwjnydktdqvhswz.supabase.co/storage/v1/object/public/testing/${uploadResult.data.path}`;

      console.log(uploadResult.data.path);

      // เปลี่ยนชื่อไฟล์ที่อัปโหลดเป็น URL
      file.originalname = userPhotourl;
    } else {
      console.error(
        "Error uploading file to Supabase storage",
        uploadResult.error
      );
      return res
        .status(500)
        .json({ message: "Error uploading file to Supabase storage" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const { data, error } = await supabase.from("users").insert([
      {
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        password: hashedPassword,
        job_position: req.body.job_position,
        summary_title: req.body.summary_title,
        summary_description: req.body.summary_description,
        work_experience: req.body.work_experience,
        work_detail: req.body.work_detail,
        skill_title: req.body.skill_title,
        skill_detail: req.body.skill_detail,
        user_photo: file.originalname,
      },
    ]);
    // .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    console.log("User data after registration:", data);

    return res.json({
      message: "Your account has been created successfully",
    });
  } catch (err) {
    console.error("Error while registering user:", err);
    return res.status(500).json({ error: "Failed to register user." });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", req.body.email);

    if (!user[0]) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (req.body.user_id) {
      userQuery = userQuery.eq("user_id", req.body.user_id);
    }

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Password is invalid",
      });
    }
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    const token = jwt.sign(
      {
        user_id: user[0].user_id,
        fullName: user[0].fullName,
        email: user[0].email,
        phoneNumber: user[0].phoneNumber,
      },
      process.env.REACT_APP_JWT_KEY,
      { expiresIn: "900000" }
    );
    return res.json({
      message: "login successfully",
      data: user[0],
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default authRouter;
