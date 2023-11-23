import express from "express";
import usersRouter from "./apps/users.js";
// import { client } from "./utils/db.js";
import authRouter from "./apps/auth.js";
import cors from "cors";

async function init() {
  // dotenv.config();

  const app = express();
  const port = 3000;

  // await client.connect();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/auth", authRouter);
  app.use("/users", usersRouter);

  app.get("/", (req, res) => {
    res.send("Hello World! Test Port 3000");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}

init();
