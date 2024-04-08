"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const anonymous_controller_1 = require("../../controllers/anonymous/anonymous.controller");
const router = express_1.default.Router();
router.post("/register", anonymous_controller_1.registerAnonymous);
exports.default = router;
