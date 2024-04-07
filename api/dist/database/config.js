"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://kkuremindyou-default-rtdb.asia-southeast1.firebasedatabase.app",
});
exports.default = admin;
