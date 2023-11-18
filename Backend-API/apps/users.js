import { ObjectId } from "mongodb";
import { Router } from "express";

import { db } from "../utils/db.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  const collection = db.collection("users");

  const messages = await collection.find({}).toArray();

  return res.json({ data: messages });
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("users");

    const userId = req.params.id;
    const query = { _id: new ObjectId(userId) };

    const user = await collection.findOne(query);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ data: user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

usersRouter.post("/", async (req, res) => {
  const collection = db.collection("users");

  const usersData = { ...req.body };
  const users = await collection.insertOne(usersData);

  return res.json({
    message: `User's profile (${users.insertedId}) has been created successfully`,
  });
});

usersRouter.put("/:userId", async (req, res) => {
  try {
    const collection = db.collection("users");

    const userId = new ObjectId(req.params.userId);
    const newUserData = { ...req.body };

    await collection.updateOne(
      {
        _id: userId,
      },
      { $set: newUserData }
    );

    return res.json({
      message: `Profile (${userId}) has been updated successfully`,
    });
  } catch (error) {
    console.error("Error updating message:", error);

    return res.status(500).json({ error: error.message });
  }
});

usersRouter.delete("/:userId", async (req, res) => {
  try {
    const collection = db.collection("users");
    const userId = new ObjectId(req.params.userId);
    await collection.deleteOne({
      _id: userId,
    });

    return res.json({
      message: `(${userId}) has been deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default usersRouter;
