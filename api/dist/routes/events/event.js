"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_guard_1 = require("../../middleware/auth.guard");
const router = express_1.default.Router();
router.get("/event", auth_guard_1.authGuard, (req, res) => {
    res.status(200).json({ response: req.user });
});
exports.default = router;
