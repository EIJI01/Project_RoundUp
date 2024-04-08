import { Request, Response } from "express";
import admin from "../../database/config";
import axios from "axios";
import httpStatus from "http-status";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const response = await axios
      .post(`${process.env.LOGIN_URL}:signInWithPassword?key=${process.env.API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken } = response.data;
    const userRecord = await admin.auth()
          .getUserByEmail(email);

    res.status(httpStatus.OK).json({
      status: "success",
      msg: "User logged in successfully.",
      token: idToken,
      user: userRecord,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(httpStatus.UNAUTHORIZED)
       .json({ error: "Invalid login credentials" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phoneNumber, faculty, studentID, password } = req.body;

    await admin.auth()
      .createUser({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        faculty: faculty, 
        studentID: studentID,
        password:password
      })
      .then((userCredential: any) => {
        console.log(userCredential);
        admin.firestore()
             .collection("user")
             .doc(userCredential.uid)
             .set({
              firstName: firstName, 
              lastName: lastName, 
              phoneNumber: phoneNumber, 
              faculty: faculty, 
              studentID: studentID, 
              password: password
              })
        res.status(httpStatus.OK)
           .json({ msg: "Create user success" });
      })
      .catch((error: any) => {
        const errorMessage = error.message;
        res.status(400)
           .json({ error: errorMessage });
      });

  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
       .json({ error: "Internal server error" });
  }
};

