import { Response, NextFunction } from "express";
import httpStatus from "http-status";
import admin from "../database/config";
import { IGetUserAuthInfoRequest } from "../models/user";

export const authGuard = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization && 
        !req.headers.authorization?.startsWith("Bearer ")) {
      return res.status(httpStatus.UNAUTHORIZED)
                .json({ error: "Authorization header missing" });
    }

    const idToken = req.headers.authorization!.split(" ")[1];
    if (!idToken) {
      return res.status(httpStatus.UNAUTHORIZED)
                .json({ error: "Authorization header missing "});
    }

    await admin.auth().verifyIdToken(idToken)
      .then((decodedToken: any) => {
        const uid = decodedToken.uid;
        req.user = uid;
        next();
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(httpStatus.UNAUTHORIZED)
       .json({ error: "Unauthorized" });
  }
};
