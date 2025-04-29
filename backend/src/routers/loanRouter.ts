import express from 'express';
import { createLoan } from '../resolvers/loan/createLoan'
import { putLoan } from '../resolvers/loan/putLoan';

export const loanRouter = express.Router();

loanRouter.post("/",  createLoan);
loanRouter.put("/:loanId",  putLoan);