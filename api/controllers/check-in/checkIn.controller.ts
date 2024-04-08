import { Request, Response } from "express";
import httpStatus from "http-status";
import admin from "../../database/config";
import { toThaiDateString } from "../../common/date";
import { IGetUserAuthInfoRequest } from "../../models/use";

const db = admin.firestore();
export const anonymousCheckIn = async (req:Request, res: Response) => {
    try {
        const { firstName, lastName, faculty, phoneNumber, studentId } = req.body;
        const docRef = db.collection("anonymous").doc();
        await docRef.set({ firstName, lastName, faculty, phoneNumber, studentId });
        const docId = docRef.id;
        if(!docId){
            res.status(httpStatus.NOT_FOUND).json({ error: "Anonymous not found" });
        }
        const checkInRef = db.collection("checkIn").doc();
        await checkInRef.set({anonymousId: docId, checkInAt: toThaiDateString(new Date())})
        res.status(httpStatus.OK).json({ anonymousId: docId });

    }catch(error:any)
    {
        console.error("Failed to check in anonymous:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}

export const userCheckIn = async (req:IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.user;
        const docRef = db.collection("user").doc(userId);
        const userData = await docRef.get();
        if(!userData.exists){
            return res.status(httpStatus.NOT_FOUND)
                      .json({error: "User not found"})
        }
        const checkInRef = db.collection("checkIn").doc();
        await checkInRef.set({userId: userId, checkInAt: toThaiDateString(new Date())})
        res.status(httpStatus.OK).json("User check in success");

    }catch(error:any)
    {
        console.error("Failed to check in user:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}