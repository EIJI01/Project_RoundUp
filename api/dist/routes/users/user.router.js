"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_guard_1 = require("../../middleware/auth.guard");
const user_controller_1 = require("../../controllers/users/user.controller");
const router = express_1.default.Router();
router.get("/information", auth_guard_1.authGuard, user_controller_1.getUserInformation);
exports.default = router;
