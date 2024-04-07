"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication/authentication"));
const event_1 = __importDefault(require("./events/event"));
const router = express_1.default.Router();
router.use("/authentication", authentication_1.default);
router.use("/api", event_1.default);
exports.default = router;
