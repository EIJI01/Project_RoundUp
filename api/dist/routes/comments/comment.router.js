"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../../controllers/comments/comment.controller");
const auth_guard_1 = require("../../middleware/auth.guard");
const router = express_1.default.Router();
router.post("/anonymous", comment_controller_1.anonymousComment);
router.post("/user", auth_guard_1.authGuard, comment_controller_1.userComment);
exports.default = router;
