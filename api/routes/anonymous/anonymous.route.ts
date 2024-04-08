import express from "express"
import { registerAnonymous } from "../../controllers/anonymous/anonymous.controller";
const router = express.Router();

router.post("/register", registerAnonymous);

export default router;