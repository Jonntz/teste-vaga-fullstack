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
  try {
    const allCostumers = await getAllCostumers();
    response.status(200).json(allCostumers);
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};