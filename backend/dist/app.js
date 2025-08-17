"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
const error_1 = require("./middleware/error");
function createApp() {
    const app = (0, express_1.default)();
    app.disable("x-powered-by");
    app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({ origin: true, credentials: true }));
    app.get("/health", (_req, res) => res.json({ ok: true }));
    app.use("/comments", comments_routes_1.default);
    app.use(error_1.errorHandler);
    return app;
}
