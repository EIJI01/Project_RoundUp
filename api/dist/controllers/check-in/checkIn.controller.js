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
exports.multiUserCheckIn = exports.anonymousCheckInWithUnlimitedQuantity = exports.userCheckIn = exports.anonymousCheckIn = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../database/config"));
const date_1 = require("../../common/date");
const db = config_1.default.firestore();
const anonymousCheckIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, faculty, phoneNumber, studentId, eventId } = req.body;
        const docRef = db.collection("anonymous").doc();
        yield docRef.set({
            firstName, lastName, faculty,
            phoneNumber, studentId
        });
        const docId = docRef.id;
        if (!docId) {
            res.status(http_status_1.default.NOT_FOUND)
                .json({ error: "Anonymous not found" });
        }
        const checkInRef = db.collection("checkIn").doc();
        yield checkInRef.set({
            anonymousId: docId,
            checkInAt: (0, date_1.toThaiDateString)(new Date())
        });
        const checkInId = checkInRef.id;
        const eventDocRef = db.collection("event").doc(eventId);
        yield eventDocRef.update({
            checkInId: config_1.default.firestore.FieldValue.arrayUnion(checkInId)
        });
        res.status(http_status_1.default.OK).json({ anonymousId: docId });
    }
    catch (error) {
        console.error("Failed to check in anonymous:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.anonymousCheckIn = anonymousCheckIn;
const userCheckIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const { eventId } = req.body;
        const userDocRef = db.collection("user").doc(userId);
        const userData = yield userDocRef.get();
        if (!userData.exists) {
            return res.status(http_status_1.default.NOT_FOUND)
                .json({ error: "User not found" });
        }
        const checkInRef = db.collection("checkIn").doc();
        yield checkInRef.set({
            userId: userId,
            checkInAt: (0, date_1.toThaiDateString)(new Date())
        });
        const checkInId = checkInRef.id;
        const eventDocRef = db.collection("event").doc(eventId);
        yield eventDocRef.update({
            checkInId: config_1.default.firestore.FieldValue.arrayUnion(checkInId)
        });
        res.status(http_status_1.default.OK).json({ message: "User check in success", checkInId });
    }
    catch (error) {
        console.error("Failed to check in user:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
});
exports.userCheckIn = userCheckIn;
const anonymousCheckInWithUnlimitedQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, quantity } = req.body;
        let anonymousCheckInId;
        for (let i = 0; i < quantity; i++) {
            const firstName = "";
            const lastName = "";
            const faculty = "";
            const phoneNumber = "";
            const studentId = "";
            const docRef = db.collection("anonymous").doc();
            yield docRef.set({
                firstName, lastName, faculty,
                phoneNumber, studentId
            });
            const docId = docRef.id;
            if (i === 0) {
                anonymousCheckInId = docId;
            }
            if (!docId) {
                res.status(http_status_1.default.NOT_FOUND)
                    .json({ error: "Anonymous not found" });
                return; // Return to stop further execution
            }
            const checkInRef = db.collection("checkIn").doc();
            yield checkInRef.set({
                anonymousId: docId,
                checkInAt: (0, date_1.toThaiDateString)(new Date())
            });
            const checkInId = checkInRef.id;
            const eventDocRef = db.collection("event").doc(eventId);
            yield eventDocRef.update({
                checkInId: config_1.default.firestore.FieldValue.arrayUnion(checkInId)
            });
        }
        res.status(http_status_1.default.OK).json({ anonymousId: anonymousCheckInId });
    }
    catch (error) {
        console.error("Failed to check in multi anonymous:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.anonymousCheckInWithUnlimitedQuantity = anonymousCheckInWithUnlimitedQuantity;
const multiUserCheckIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const { eventId, quantity } = req.body;
        for (let i = 0; i < quantity; i++) {
            if (i === 0) {
                const userDocRef = db.collection("user").doc(userId);
                const userData = yield userDocRef.get();
                if (!userData.exists) {
                    return res.status(http_status_1.default.NOT_FOUND)
                        .json({ error: "User not found" });
                }
                const checkInRef = db.collection("checkIn").doc();
                yield checkInRef.set({
                    userId: userId,
                    checkInAt: (0, date_1.toThaiDateString)(new Date())
                });
                const checkInId = checkInRef.id;
                const eventDocRef = db.collection("event").doc(eventId);
                yield eventDocRef.update({
                    checkInId: config_1.default.firestore.FieldValue.arrayUnion(checkInId)
                });
            }
            else {
                const firstName = "";
                const lastName = "";
                const faculty = "";
                const phoneNumber = "";
                const studentId = "";
                const docRef = db.collection("anonymous").doc();
                yield docRef.set({
                    firstName, lastName, faculty,
                    phoneNumber, studentId
                });
                const docId = docRef.id;
                if (!docId) {
                    res.status(http_status_1.default.NOT_FOUND)
                        .json({ error: "Anonymous not found" });
                    return; // Return to stop further execution
                }
                const checkInRef = db.collection("checkIn").doc();
                yield checkInRef.set({
                    anonymousId: docId,
                    checkInAt: (0, date_1.toThaiDateString)(new Date())
                });
                const checkInId = checkInRef.id;
                const eventDocRef = db.collection("event").doc(eventId);
                yield eventDocRef.update({
                    checkInId: config_1.default.firestore.FieldValue.arrayUnion(checkInId)
                });
            }
        }
        res.status(http_status_1.default.OK).json({ message: "Multi user check in success" });
    }
    catch (error) {
        console.error("Failed to check in multi user:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
});
exports.multiUserCheckIn = multiUserCheckIn;
