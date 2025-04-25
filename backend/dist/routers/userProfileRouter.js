"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
const getProfile_1 = require("../resolvers/userProfile/getProfile");
const createProfile_1 = require("../resolvers/userProfile/createProfile");
const validate_1 = require("../middlewares/validate");
const profileSchema_1 = require("../validators/profileSchema");
const authorization_1 = require("../middlewares/authorization");
exports.userProfileRouter = express_1.default.Router();
exports.userProfileRouter.post("/", authorization_1.authorizationMiddleware, (0, validate_1.validate)(profileSchema_1.userProfileSchema), createProfile_1.createProfile);
exports.userProfileRouter.get("/", authorization_1.authorizationMiddleware, getProfile_1.viewProfile);
