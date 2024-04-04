import { Request, Response } from "express";
import app from "../../database/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

exports.login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed in as:", user.email);
        res.status(200).json({ message: "Login successful!" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign in error:", errorCode, errorMessage);
        res.status(400).json({ error: errorMessage });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
