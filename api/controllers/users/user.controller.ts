import { Response } from "express";
import { IGetUserAuthInfoRequest, UserResponse } from "../../models/user";
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

        const userResult: UserResponse = userData.data();
        const uid: string = userData.id
        res.status(httpStatus.OK).json({
            uid : uid, 
            firstName: userResult.firstName, 
            lastName: userResult.lastName,
            phoneNumber: userResult.phoneNumber,
            faculty: userResult.faculty,
            email: userResult.email,
            });
    }catch(error: any)
    {
        console.error("Error fetching event:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }

}