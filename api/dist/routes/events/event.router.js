"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_guard_1 = require("../../middleware/auth.guard");
const event_controller_1 = require("../../controllers/events/event.controller");
const router = express_1.default.Router();
router.get("/get-all", auth_guard_1.authGuard, event_controller_1.getAllEvent);
router.get("/get-id/:id", auth_guard_1.authGuard, event_controller_1.getEventById);
router.get("/get-id-no-guard/:id", event_controller_1.getEventById);
exports.default = router;
