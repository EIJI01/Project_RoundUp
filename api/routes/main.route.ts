import express from "express";
import authenticationRouter from "./authentication/authentication.router";
import eventApi from "./events/event.router";
import userAPI from "./users/user.router";
import commentApi from "./comments/comment.router"
import anonymousApi from "./anonymous/anonymous.route";
import checkInApi from "./check-in/checkIn.route";
import reservationApi from "./reservation/reservation.route";

const router = express.Router();

router.use("/authentication", authenticationRouter);
router.use("/event", eventApi);
router.use("/user", userAPI);
router.use("/comment", commentApi);
router.use("/anonymous", anonymousApi)
router.use("/reservation", reservationApi)
router.use("/check-in", checkInApi)

export default router;
