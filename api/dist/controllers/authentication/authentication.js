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
exports.registerUser = exports.loginUser = void 0;
const config_1 = __importDefault(require("../../database/config"));
const axios_1 = __importDefault(require("axios"));
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const response = yield axios_1.default.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`, {
            email,
            password,
            returnSecureToken: true,
        });
        const { idToken } = response.data;
        const userRecord = yield config_1.default.auth().getUserByEmail(email);
        res.status(http_status_1.default.OK).json({
            status: "success",
            msg: "User logged in successfully.",
            token: idToken,
            user: userRecord,
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(401).json({ error: "Invalid login credentials" });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        yield config_1.default
            .auth()
            .createUser({
            email: email,
            password: password,
            displayName: name,
        })
            .then((userCredential) => {
            console.log(userCredential);
            res.status(http_status_1.default.OK).json({ msg: "Create user success" });
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Sign in error:", errorCode, errorMessage);
            res.status(400).json({ error: errorMessage });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.registerUser = registerUser;
