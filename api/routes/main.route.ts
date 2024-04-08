import express from "express";
import authenticationRouter from "./authentication/authentication.router";
import eventApi from "./events/event.router";
import userAPI from "./users/user.router";
import commentApi from "./comments/comment.router"

const router = express.Router();

router.use("/authentication", authenticationRouter);
router.use("/event", eventApi);
router.use("/user", userAPI);
router.use("/comment", commentApi);

export default router;
