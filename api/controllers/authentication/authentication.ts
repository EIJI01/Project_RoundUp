import { Request, Response } from "express";
import admin from "../../database/config";
import axios from "axios";
import httpStatus from "http-status";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const response = await axios
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken } = response.data;
    const userRecord = await admin.auth().getUserByEmail(email);

    res.status(httpStatus.OK).json({
      status: "success",
      msg: "User logged in successfully.",
      token: idToken,
      user: userRecord,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(401).json({ error: "Invalid login credentials" });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    await admin.auth()
      .createUser({
        email: email,
        password: password,
        displayName: name,
      })
      .then((userCredential: any) => {
        console.log(userCredential);
        res.status(httpStatus.OK).json({ msg: "Create user success" });
      })
      .catch((error: any) => {
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

export { loginUser, registerUser };
