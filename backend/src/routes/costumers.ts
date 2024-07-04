import { Request, Response, Router } from "express";
import { processCostumersByCsv } from "../services/costumerServices";
import { getAll, uploadCostumerCsv } from "../controllers/costumerController";

export const costumerRouter = Router();

costumerRouter.post('/', uploadCostumerCsv);
costumerRouter.get('/', getAll);
