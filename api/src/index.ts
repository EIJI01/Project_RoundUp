import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import database from "./../database/database";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  // res.send("Express + TypeScript Server");
  try {
    const data = await database.collection("event").get();
    const responseData = data.docs.map((doc: any) => doc.data());
    // res.json(responseData);
    console.log(responseData[0].ImageURL);
    const response = await fetch(responseData[0].ImageURL);
    console.log(typeof response);

    res.status(200).send(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
