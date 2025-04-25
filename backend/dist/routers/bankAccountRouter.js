"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const createAccount_1 = require("../resolvers/account/createAccount");
exports.accountRouter = express_1.default.Router();
exports.accountRouter.post("/", createAccount_1.createAccount);
