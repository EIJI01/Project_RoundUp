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
exports.registerAnonymous = void 0;
const config_1 = __importDefault(require("../../database/config"));
const http_status_1 = __importDefault(require("http-status"));
const db = config_1.default.firestore();
const registerAnonymous = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, faculty, phoneNumber, studentId } = req.body;
        const docRef = db.collection("anonymous").doc();
        yield docRef.set({ firstName, lastName, faculty, phoneNumber, studentId });
        const docId = docRef.id;
        res.status(http_status_1.default.OK).json({ anonymousId: docId });
    }
    catch (error) {
        console.error("Error register anonymous:", error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.registerAnonymous = registerAnonymous;
