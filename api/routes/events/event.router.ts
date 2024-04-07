import express, { Response } from "express";
import { authGuard } from "../../middleware/auth.guard";
import { IGetUserAuthInfoRequest } from "../../models/use";

const router = express.Router();

router.get("/event", authGuard, (req: IGetUserAuthInfoRequest, res: Response) => {
  res.status(200).json({ response: req.user });
});

export default router;
