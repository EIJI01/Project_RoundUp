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
exports.getEventById = exports.getAllEvent = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../database/config"));
const db = config_1.default.firestore();
const getAllEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventDb = yield db.collection("event").get();
        const eventData = eventDb.docs.map((doc) => doc.data());
        res.status(http_status_1.default.OK).json(eventData);
    }
    catch (error) {
        console.error("Error fetching event:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.getAllEvent = getAllEvent;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestId = req.params.id;
    try {
        const eventRef = db.collection("event").doc(requestId);
        const eventDoc = yield eventRef.get();
        if (!eventDoc.exists) {
            return res.status(http_status_1.default.NOT_FOUND)
                .json({ error: "Event not found" });
        }
        const eventData = eventDoc.data();
        res.status(http_status_1.default.OK).json(eventData);
    }
    catch (error) {
        console.error("Error fetching event:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.getEventById = getEventById;
