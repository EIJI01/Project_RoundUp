import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../models/use";
import admin from "../../database/config";
import httpStatus from "http-status";
import { toThaiDateString } from "../../common/date";

const db = admin.firestore();
export const userReservation = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.user;
        const {eventId} = req.body;
        const docRef = db.collection("user").doc(userId);
        const userData = await docRef.get();
        if(!userData.exists){
            return res.status(httpStatus.NOT_FOUND)
                      .json({error: "User not found"})
        }
        const checkInRef = db.collection("reserve").doc();
        await checkInRef.set({userId: userId, reserveAt: toThaiDateString(new Date())})
        const reserveId = checkInRef.id;

        const eventDocRef = db.collection("event").doc(eventId);
        await eventDocRef.update({
            reserveId: admin.firestore.FieldValue.arrayUnion(reserveId) });

        res.status(httpStatus.OK).json({message: "User reserve success"});

    }catch(error:any)
    {
        console.error("Failed to reserve user:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}