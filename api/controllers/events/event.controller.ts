import { Request, Response } from "express";
import httpStatus from "http-status";
import admin from "../../database/config";
import { IGetUserAuthInfoRequest, UserResponse } from "../../models/use";

const db = admin.firestore();

export const getAllEvent = async (req:Request, res:Response) => {
    try{
        const eventDb = await db.collection("event").get();
        const eventData = eventDb.docs.map((doc:any) => doc.data());
        res.status(httpStatus.OK).json(eventData)
    }catch(error: any)
    {
        console.error("Error fetching event:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}

export const getEventById = async (req: Request, res: Response) => {
    const requestId = req.params.id;
    try{
        const eventRef = db.collection("event").doc(requestId);
        const eventDoc = await eventRef.get();
        if (!eventDoc.exists) {
            return res.status(httpStatus.NOT_FOUND)
                      .json({ error: "Event not found" });
        }
        const eventData = eventDoc.data();
        res.status(httpStatus.OK).json(eventData);
    }catch(error: any)
    {
        console.error("Error fetching event:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}
