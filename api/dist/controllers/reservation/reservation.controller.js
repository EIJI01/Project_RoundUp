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
exports.userReservation = void 0;
const config_1 = __importDefault(require("../../database/config"));
const http_status_1 = __importDefault(require("http-status"));
const date_1 = require("../../common/date");
const db = config_1.default.firestore();
const userReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const { eventId } = req.body;
        const docRef = db.collection("user").doc(userId);
        const userData = yield docRef.get();
        if (!userData.exists) {
            return res.status(http_status_1.default.NOT_FOUND)
                .json({ error: "User not found" });
        }
        const checkInRef = db.collection("reserve").doc();
        yield checkInRef.set({ userId: userId, reserveAt: (0, date_1.toThaiDateString)(new Date()) });
        const reserveId = checkInRef.id;
        const eventDocRef = db.collection("event").doc(eventId);
        yield eventDocRef.update({
            reserveId: config_1.default.firestore.FieldValue.arrayUnion(reserveId)
        });
        res.status(http_status_1.default.OK).json({ message: "User reserve success" });
    }
    catch (error) {
        console.error("Failed to reserve user:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.userReservation = userReservation;
