import { Request, Response } from "express";
import httpStatus from "http-status";
import admin from "../../database/config";
import { IGetUserAuthInfoRequest } from "../../models/user";

const db = admin.firestore();

export const getAllEvent = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userId = req.user;

    try {
        const eventDb = await db.collection("event").get();
        const eventData = eventDb.docs.map((doc: any) => ({
            eventId: doc.id,
            ...doc.data()
        }));

        const reserveRef = db.collection("reserve");

        const listEvent = await Promise.all(eventData.map(async (event: any) => {
            if (!event.reserveId || !Array.isArray(event.reserveId)) {
                return { isReserved: false, ...event };
            }

            const reservePromises = event.reserveId.map(async (reserveId: string) => {
                const reserveDoc = await reserveRef.doc(reserveId).get();
                return reserveDoc.data()?.userId === userId;
            });
            const isReservedArray = await Promise.all(reservePromises);
            const isReserved = isReservedArray.some((value) => value);
            return { isReserved: isReserved, ...event };
        }));

        res.status(httpStatus.OK).json(listEvent);
    } catch (error: any) {
        console.error("Error fetching event:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
}


export const getEventById = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userId = req.user;
    const requestId = req.params.id;

    try {
        const eventRef = db.collection("event").doc(requestId);
        const eventDoc = await eventRef.get();

        if (!eventDoc.exists) {
            return res.status(httpStatus.NOT_FOUND)
                .json({ error: "Event not found" });
        }

        const eventData = eventDoc.data();
        const eventId: string = eventDoc.id;

        const reserveRef = db.collection("reserve");

        if (!eventData.reserveId || !Array.isArray(eventData.reserveId)) {
            return res.status(httpStatus.OK).json({ eventId: eventId, isReserved: false, ...eventData });
        }

        const reservePromises = eventData.reserveId.map(async (reserveId: string) => {
            const reserveDoc = await reserveRef.doc(reserveId).get();
            return reserveDoc.data()?.userId === userId;
        });

        const isReservedArray = await Promise.all(reservePromises);
        const isReserved = isReservedArray.some((value) => value);

        res.status(httpStatus.OK).json({ eventId: eventId, isReserved: isReserved, ...eventData });

    } catch (error: any) {
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
