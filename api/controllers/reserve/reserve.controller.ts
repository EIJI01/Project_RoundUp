import { Request, Response } from "express";
import httpStatus from "http-status";
import admin from "../../database/config";

const db = admin.firestore();

export const reserveEvent = async (req:Request, res:Response) =>{
    try{
        
    }catch(error: any)
    {
        console.error("Error fetching event:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
           .json({ error: "Internal server error" });
    }
}