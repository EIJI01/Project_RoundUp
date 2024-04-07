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
exports.authGuard = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../database/config"));
const authGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.headers.authorization && !((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer ")))
            return res.status(http_status_1.default.UNAUTHORIZED).json({ error: "Authorization header missing" });
        const idToken = req.headers.authorization.split(" ")[1];
        if (!idToken) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({ error: "Authorization header missing" });
        }
        yield config_1.default
            .auth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
            const uid = decodedToken.uid;
            req.user = uid;
            next();
        })
            .catch((error) => {
            throw new Error(error);
        });
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(http_status_1.default.UNAUTHORIZED).json({ error: "Unauthorized" });
    }
});
exports.authGuard = authGuard;
