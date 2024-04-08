import express from "express"
import { authGuard } from "../../middleware/auth.guard";
import { getUserInformation } from "../../controllers/users/user.controller";
const router = express.Router();

router.get("/information",authGuard, getUserInformation);

export default router;