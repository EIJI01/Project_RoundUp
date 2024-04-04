import express from "express";

const authenticationController = require("../../controllers/authentication/authentication");
const router = express.Router();

router.post("/login", authenticationController.login);

module.exports = router;
