"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_guard_1 = require("../../middleware/auth.guard");
const reservation_controller_1 = require("../../controllers/reservation/reservation.controller");
const router = express_1.default.Router();
router.post("/user", auth_guard_1.authGuard, reservation_controller_1.userReservation);
exports.default = router;
