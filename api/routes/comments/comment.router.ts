import express from "express"
import { anonymousComment, userComment } from "../../controllers/comments/comment.controller";
import { authGuard } from "../../middleware/auth.guard";
const router = express.Router();

router.post("/anonymous", anonymousComment);
router.post("/user", authGuard, userComment);

export default router;