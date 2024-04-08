import express from "express";
import { authGuard } from "../../middleware/auth.guard";
import { userReservation } from "../../controllers/reservation/reservation.controller";
const router = express.Router();

router.post("/user",authGuard, userReservation);

export default router;