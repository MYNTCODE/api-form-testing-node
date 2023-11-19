import { Router } from "express";
import supabase from "../utils/supabase.js";
import bcrypt from "bcrypt";
import multer from "multer";
// import jwt from "jsonwebtoken";
import PDFDocument from "pdfkit";
import fs from "fs";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
import { protect } from "../middlewares/protects.js";

const usersRouter = Router();

usersRouter.use(protect);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

usersRouter.get("/", async (req, res) => {
  try {
    const data = await supabase.from("users").select("*");
    return res.json({
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error fetching data from Supabase" });
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: "User not found / ไม่พบข้อมูลที่ค้นหา" });
    }

    return res.status(200).json({ data: data[0] }); // Return the first (and only) result
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

usersRouter.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const userId = req.params.id;
    const file = req.file;

    const updatedUser = {
      user_id: userId,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      //password: req.body.password,
      job_position: req.body.job_position,
      summary_title: req.body.summary_title,
      summary_description: req.body.summary_description,
      work_experience: req.body.work_experience,
      work_detail: req.body.work_detail,
      skill_title: req.body.skill_title,
      skill_detail: req.body.skill_detail,
    };

    // Begin transaction
    await supabase.rpc("start_transaction");

    if (file) {
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
        // Get public URL for the uploaded file
        const userPhotourl = `https://ryrmivwjnydktdqvhswz.supabase.co/storage/v1/object/public/testing/${uploadResult.data.path}`;
        console.log(uploadResult.data.path);

        updatedUser["user_photo"] = userPhotourl;
      } else {
        console.error(
          "Error uploading file to Supabase storage",
          uploadResult.error
        );
        await supabase.rpc("rollback_transaction");
        return res
          .status(500)
          .json({ message: "Error uploading file to Supabase storage" });
      }
    }

    // Update user information
    const { data: transactionData, error: transactionError } = await supabase
      .from("users")
      .upsert([updatedUser]);

    if (transactionError) {
      console.error("Error updating user data", transactionError);
      await supabase.rpc("rollback_transaction");
      return res
        .status(500)
        .json({ message: "Error updating data in supabase" });
    }

    await supabase.rpc("commit_transaction");

    return res.status(200).send("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data", error);
    res.status(500).json({
      message: "Error updating user data in supabase",
      error: error.message,
    });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("user_id", userId);

    if (error) {
      return res.status(500).json({ error: "ไม่สามารถลบได้" });
    }

    if (data && data.length === 0) {
      return res.status(404).json({ error: `ไม่พบรายการที่ตรงกับ ${userId}` });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "ไม่สามารถลบได้" });
  }
});

const createPdf = (data) => {
  const doc = new PDFDocument();
  const outputFileName = "output.pdf";
  const outputPath = path.resolve(__dirname, outputFileName);
  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(12).text(`Profile\n\n`);
  doc.fontSize(10).text(`Name: ${data.fullName}\n\n`);

  doc.end();

  return outputPath;
};
usersRouter.get("/pdf/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "User not found" });
    }

    const outputPath = createPdf(data);

    res.sendFile(outputPath, () => {
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default usersRouter;
