import { Request, Response } from "express";
import database from "../../database/database";
require("firebase/auth");

exports.login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    database
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        console.log("Signed in as:", user.email);
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign in error:", errorCode, errorMessage);
      });

    res.status(200).json({ message: "Hello world!" });
  } catch (error) {
    console.error(error);
  }
};
