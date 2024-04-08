import { Request,Response } from "express";
import admin from "../../database/config";
import httpStatus from "http-status";

const db = admin.firestore();
export const registerAnonymous = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, faculty, phoneNumber, studentId } = req.body;
        const docRef = db.collection("anonymous").doc();
        await docRef.set({ firstName, lastName, faculty, phoneNumber, studentId });
        const docId = docRef.id;
        res.status(httpStatus.OK).json({ anonymousId: docId });
    } catch (error) {
        console.error("Error register anonymous:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}