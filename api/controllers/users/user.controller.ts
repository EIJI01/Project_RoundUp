import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../models/use";
import httpStatus from "http-status";
import admin from "../../database/config";

const db = admin.firestore();

export const getUserInformation = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userId = req.user;
    try{
        const userDb = db.collection("user").doc(userId);
        const userData = await userDb.get();
        if(!userData.exists){
            return res.status(httpStatus.NOT_FOUND)
                      .json({error: "User not found"})
        }
        const userResult = userData.data();
        res.status(httpStatus.OK).json(userResult);
    }catch(error: any)
    {
        console.error("Error fetching event:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }

}