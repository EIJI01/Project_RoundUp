"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkIn_controller_1 = require("../../controllers/check-in/checkIn.controller");
const auth_guard_1 = require("../../middleware/auth.guard");
const router = express_1.default.Router();
router.post("/anonymous", checkIn_controller_1.anonymousCheckIn);
router.post("/multiAnonymous", checkIn_controller_1.anonymousCheckInWithUnlimitedQuantity);
router.post("/multiUser", auth_guard_1.authGuard, checkIn_controller_1.multiUserCheckIn);
router.post("/user", auth_guard_1.authGuard, checkIn_controller_1.userCheckIn);
exports.default = router;
