"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.DATABASE_URL,
});
exports.default = admin;
