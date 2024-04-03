"use strict";
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
// import database from "./database/database";
import { isHttpError } from "http-errors";
dotenv.config();

const cors = require("cors");
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/authentication/authentication");

app.use("/", authRouter);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

// app.get("/", async (req: Request, res: Response) => {
//   // res.send("Express + TypeScript Server");
//   try {
//     // const data = await database.collection("event").get();
//     // const responseData = data.docs.map((doc: any) => doc.data());
//     // // res.json(responseData);
//     // console.log(responseData[0].ImageURL);
//     // const response = await fetch(responseData[0].ImageURL);
//     // console.log(typeof response);

//     // res.status(200).send(response);

//     // res.status(200).json({ message: "Hello world!" });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
