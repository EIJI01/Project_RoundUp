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
exports.getEventByIdWithNoAuthGuard = exports.getEventById = exports.getAllEvent = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../database/config"));
const db = config_1.default.firestore();
const getAllEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    try {
        const eventDb = yield db.collection("event").get();
        const eventData = eventDb.docs.map((doc) => (Object.assign({ eventId: doc.id }, doc.data())));
        const reserveRef = db.collection("reserve");
        const listEvent = yield Promise.all(eventData.map((event) => __awaiter(void 0, void 0, void 0, function* () {
            if (!event.reserveId || !Array.isArray(event.reserveId)) {
                return Object.assign({ isReserved: false }, event);
            }
            const reservePromises = event.reserveId.map((reserveId) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const reserveDoc = yield reserveRef.doc(reserveId).get();
                return ((_a = reserveDoc.data()) === null || _a === void 0 ? void 0 : _a.userId) === userId;
            }));
            const isReservedArray = yield Promise.all(reservePromises);
            const isReserved = isReservedArray.some((value) => value);
            return Object.assign({ isReserved: isReserved }, event);
        })));
        res.status(http_status_1.default.OK).json(listEvent);
    }
    catch (error) {
        console.error("Error fetching event:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.getAllEvent = getAllEvent;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const requestId = req.params.id;
    try {
        const eventRef = db.collection("event").doc(requestId);
        const eventDoc = yield eventRef.get();
        if (!eventDoc.exists) {
            return res.status(http_status_1.default.NOT_FOUND)
                .json({ error: "Event not found" });
        }
        const eventData = eventDoc.data();
        const eventId = eventDoc.id;
        const reserveRef = db.collection("reserve");
        if (!eventData.reserveId || !Array.isArray(eventData.reserveId)) {
            return res.status(http_status_1.default.OK).json(Object.assign({ eventId: eventId, isReserved: false }, eventData));
        }
        const reservePromises = eventData.reserveId.map((reserveId) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            const reserveDoc = yield reserveRef.doc(reserveId).get();
            return ((_b = reserveDoc.data()) === null || _b === void 0 ? void 0 : _b.userId) === userId;
        }));
        const isReservedArray = yield Promise.all(reservePromises);
        const isReserved = isReservedArray.some((value) => value);
        res.status(http_status_1.default.OK).json(Object.assign({ eventId: eventId, isReserved: isReserved }, eventData));
    }
    catch (error) {
        console.error("Error fetching event:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.getEventById = getEventById;
const getEventByIdWithNoAuthGuard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestId = req.params.id;
    try {
        const eventRef = db.collection("event").doc(requestId);
        const eventDoc = yield eventRef.get();
        if (!eventDoc.exists) {
            return res.status(http_status_1.default.NOT_FOUND)
                .json({ error: "Event not found" });
        }
        const eventData = eventDoc.data();
        const eventId = eventDoc.id;
        res.status(http_status_1.default.OK).json(Object.assign({ eventId: eventId }, eventData));
    }
    catch (error) {
        console.error("Error fetching event:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.getEventByIdWithNoAuthGuard = getEventByIdWithNoAuthGuard;
