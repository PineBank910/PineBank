"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizationMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ message: "Unauthorized!" });
        return;
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "logically impossible");
        if (decoded && decoded.id) {
            req.user = { id: decoded.id };
            return next();
        }
        else {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};
exports.authorizationMiddleware = authorizationMiddleware;
