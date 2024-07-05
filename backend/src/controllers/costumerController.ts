import { Request, Response } from "express";
import { getAllCostumers, processCostumersByCsv } from "../services/costumerServices";

export const uploadCostumerCsv = async (request: Request, response:Response): Promise<void> => {
  try{
    const { costumerCsvData } = request.body;
    await processCostumersByCsv(costumerCsvData);
    response.status(200).json({ message: 'CSV processed successfully' });
  } catch(error: any) {
    response.status(500).json({ error: error.message });
  }
};

export const getAll = async (request: Request, response:Response) => {
  const page = parseInt(request.query.page as string) || 1;
  const pageSize = 10;

  try {
    const allCostumers = await getAllCostumers(page, pageSize);
    response.status(200).json(allCostumers);
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};