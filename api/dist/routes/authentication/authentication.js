"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../../controllers/authentication/authentication");
const router = express_1.default.Router();
router.post("/login", authentication_1.loginUser);
router.post("/register", authentication_1.registerUser);
exports.default = router;
