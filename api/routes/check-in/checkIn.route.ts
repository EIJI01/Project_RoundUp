import express from "express";
import { anonymousCheckIn, anonymousCheckInWithUnlimitedQuantity, multiUserCheckIn, userCheckIn } from "../../controllers/check-in/checkIn.controller";
import { authGuard } from "../../middleware/auth.guard";
const router = express.Router();

router.post("/anonymous", anonymousCheckIn);
router.post("/multiAnonymous", anonymousCheckInWithUnlimitedQuantity);
router.post("/multiUser",authGuard, multiUserCheckIn);
router.post("/user",authGuard, userCheckIn);

export default router;