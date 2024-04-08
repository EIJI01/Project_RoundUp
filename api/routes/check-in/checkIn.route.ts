import express from "express";
import { anonymousCheckIn, userCheckIn } from "../../controllers/check-in/checkIn.controller";
import { authGuard } from "../../middleware/auth.guard";
const router = express.Router();

router.post("/anonymous", anonymousCheckIn);
router.post("/user",authGuard, userCheckIn);

export default router;