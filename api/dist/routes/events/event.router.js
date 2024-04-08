"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("../../controllers/events/event.controller");
const router = express_1.default.Router();
router.get("/get-all", event_controller_1.getAllEvent);
router.get("/get-id/:id", event_controller_1.getEventById);
exports.default = router;
