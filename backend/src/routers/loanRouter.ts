import express from 'express';
import { createLoan } from '../resolvers/loan/createLoan'
import { putLoan } from '../resolvers/loan/putLoan';
import { authorizationMiddleware } from '../middlewares/authorization';

export const loanRouter = express.Router();

loanRouter.post("/", authorizationMiddleware, createLoan);
loanRouter.put("/:loanId", authorizationMiddleware, putLoan);