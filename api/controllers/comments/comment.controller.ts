import { Request, Response } from "express";
import admin from "../../database/config";
import httpStatus from "http-status";
import { IGetUserAuthInfoRequest } from "../../models/user";

const db = admin.firestore();
export const anonymousComment = async (req: Request, res: Response) => {
    try{
        const {eventId, anonymousId, commentDetail, ratting} = req.body;
        const anonymousExist = await db.collection("anonymous").doc(anonymousId).get();
        if(!anonymousExist.exists){
            return res.status(httpStatus.NOT_FOUND)
                      .json({error: "Anonymous not found"});
        }
        const commentCollection = db.collection("comment").doc();
        await commentCollection.set({ anonymousId, commentDetail, eventId, ratting})
        const commentId = commentCollection.id;

        const eventDocRef = db.collection("event").doc(eventId);
        await eventDocRef.update({
            commentId: admin.firestore.FieldValue.arrayUnion(commentId) });

        res.status(httpStatus.OK).json({message: "Comment success"})
    }catch(error: any)
    {
        console.error("Failed to comment anonymous:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}

export const userComment = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try{
        const userId = req.user;
        const {eventId, commentDetail, ratting} = req.body;
        const userExist = db.collection("user").doc(userId);
        const userData = await userExist.get();
        if(!userData.exists){
            return res.status(httpStatus.NOT_FOUND)
                      .json({error: "User not found"});
        }
        const commentCollection = db.collection("comment").doc();
        await commentCollection.set({ userId:userId, commentDetail, eventId, ratting})
        const commentId = commentCollection.id;

        const eventDocRef = db.collection("event").doc(eventId);
        await eventDocRef.update({
            commentId: admin.firestore.FieldValue.arrayUnion(commentId) });

        res.status(httpStatus.OK).json({message: "Comment success"})
    }catch(error: any)
    {
        console.error("Failed to comment anonymous:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}

