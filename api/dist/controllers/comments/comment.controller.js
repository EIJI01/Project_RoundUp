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
exports.userComment = exports.anonymousComment = void 0;
const config_1 = __importDefault(require("../../database/config"));
const http_status_1 = __importDefault(require("http-status"));
const db = config_1.default.firestore();
const anonymousComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, anonymousId, commentDetail, ratting } = req.body;
        const anonymousExist = yield db.collection("anonymous").doc(anonymousId).get();
        if (!anonymousExist.exists) {
            return res.status(http_status_1.default.NOT_FOUND)
                .json({ error: "Anonymous not found" });
        }
        const commentCollection = db.collection("comment").doc();
        yield commentCollection.set({ anonymousId, commentDetail, eventId, ratting });
        const commentId = commentCollection.id;
        const eventDocRef = db.collection("event").doc(eventId);
        yield eventDocRef.update({
            commentId: config_1.default.firestore.FieldValue.arrayUnion(commentId)
        });
        res.status(http_status_1.default.OK).json({ message: "Comment success" });
    }
    catch (error) {
        console.error("Failed to comment anonymous:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.anonymousComment = anonymousComment;
const userComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const { eventId, commentDetail, ratting } = req.body;
        const userExist = db.collection("user").doc(userId);
        const userData = yield userExist.get();
        if (!userData.exists) {
            return res.status(http_status_1.default.NOT_FOUND)
                .json({ error: "User not found" });
        }
        const commentCollection = db.collection("comment").doc();
        yield commentCollection.set({ userId: userId, commentDetail, eventId, ratting });
        const commentId = commentCollection.id;
        const eventDocRef = db.collection("event").doc(eventId);
        yield eventDocRef.update({
            commentId: config_1.default.firestore.FieldValue.arrayUnion(commentId)
        });
        res.status(http_status_1.default.OK).json({ message: "Comment success" });
    }
    catch (error) {
        console.error("Failed to comment anonymous:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.userComment = userComment;
