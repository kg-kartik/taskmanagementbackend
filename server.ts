const bodyParser = require("body-parser");
import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import { ErrorHandler } from "./src/middlewares/errorHandler";
import Users from "./src/routes/Users";
import Admins from "./src/routes/Admins"
import TOdo from "./src/routes/Todos"

app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const db: string = process.env.MONGO_URI;
console.log(db);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("databse ");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

const PORTNUMBER: number = parseInt(process.env.PORT) || 5000;

app.use("/user",Users);
app.use("/admin",Admins);
app.use("/todo",TOdo);

app.use(ErrorHandler);

app.listen(PORTNUMBER, (): void => {
  console.log(`Server is running on ${PORTNUMBER}`);
});
