"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInformation = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../database/config"));
const db = config_1.default.firestore();
const getUserInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    try {
        const userDb = db.collection("user").doc(userId);
        const userData = yield userDb.get();
        if (!userData.exists) {
            return res.status(http_status_1.default.NOT_FOUND)
                .json({ error: "User not found" });
        }
        const userResult = userData.data();
        res.status(http_status_1.default.OK).json(userResult);
    }
    catch (error) {
        console.error("Error fetching event:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.getUserInformation = getUserInformation;
