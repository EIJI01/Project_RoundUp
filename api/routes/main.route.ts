import express from "express";
import authenticationRouter from "./authentication/authentication";
import apiEvent from "./events/event";
const router = express.Router();

router.use("/authentication", authenticationRouter);
router.use("/api", apiEvent);

export default router;
