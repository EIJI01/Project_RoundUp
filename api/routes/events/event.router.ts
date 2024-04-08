import express, { Response } from "express";
import { authGuard } from "../../middleware/auth.guard";
import { getAllEvent, getEventById } from "../../controllers/events/event.controller";

const router = express.Router();

router.get("/get-all", getAllEvent);
router.get("/get-id/:id", getEventById)

export default router;
