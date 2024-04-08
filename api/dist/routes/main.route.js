"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_router_1 = __importDefault(require("./authentication/authentication.router"));
const event_router_1 = __importDefault(require("./events/event.router"));
const user_router_1 = __importDefault(require("./users/user.router"));
const comment_router_1 = __importDefault(require("./comments/comment.router"));
const anonymous_route_1 = __importDefault(require("./anonymous/anonymous.route"));
const router = express_1.default.Router();
router.use("/authentication", authentication_router_1.default);
router.use("/event", event_router_1.default);
router.use("/user", user_router_1.default);
router.use("/comment", comment_router_1.default);
router.use("/anonymous", anonymous_route_1.default);
exports.default = router;
