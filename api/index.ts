"use strict";
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
