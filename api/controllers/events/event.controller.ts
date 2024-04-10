import { Request, Response } from "express";
import httpStatus from "http-status";
import admin from "../../database/config";
import { IGetUserAuthInfoRequest } from "../../models/user";

const db = admin.firestore();

export const getAllEvent = async (req: Request, res:Response) => {
    try{
        const eventDb = await db.collection("event").get();
        const eventData = eventDb.docs.map((doc: any) => ({
            eventId: doc.id,
            ...doc.data()
        }));
        res.status(httpStatus.OK).json(eventData)
    }catch(error: any)
    {
        console.error("Error fetching event:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}

export const getEventById = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userId = req.user;
    const requestId = req.params.id;

    try{
        const eventRef = db.collection("event").doc(requestId);
        const eventDoc = await eventRef.get();
        if (!eventDoc.exists) {
            return res.status(httpStatus.NOT_FOUND)
                      .json({ error: "Event not found" });
        }
        const eventData = eventDoc.data();
        const eventId: string = eventDoc.id;
        const reserveRef = db.collection("reserve");
        const reserveDoc = await reserveRef.get();
        const reserveData = reserveDoc.docs.map((doc: any) => (doc.data()));
        const isReserved = reserveData.some((reserved:any)=>{return reserved.userId === userId})
        res.status(httpStatus.OK).json({ eventId: eventId, isReserved: isReserved, ...eventData });
    }catch(error: any)
    {
        console.error("Error fetching event:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}

export const getEventByIdWithNoAuthGuard = async (req: Request, res: Response) => {
    const requestId = req.params.id;

    try{
        const eventRef = db.collection("event").doc(requestId);
        const eventDoc = await eventRef.get();
        if (!eventDoc.exists) {
            return res.status(httpStatus.NOT_FOUND)
                      .json({ error: "Event not found" });
        }
        const eventData = eventDoc.data();
        const eventId: string = eventDoc.id;
        res.status(httpStatus.OK).json({ eventId: eventId, ...eventData });
    }catch(error: any)
    {
        console.error("Error fetching event:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}
