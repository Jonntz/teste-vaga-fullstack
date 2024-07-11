import { Request, Response } from "express";
import { getAllCostumers, processCostumersByCsv } from "../services/costumerServices";
import upload from "../middleware/uploadMiddleware";

export const uploadCostumerCsv = [
  upload.single('file'),
  async (request: Request, response: Response) => {
    try {
      if (!request.file) {
        return response.status(400).send({ message: 'No file uploaded' });
      }

      const filePath = request.file.path;
      await processCostumersByCsv(filePath);
      response.status(200).send({ message: 'File processed successfully'});
      
    } catch (error) {
      console.error(error);
      response.status(500).send({ message: 'Error processing file' });
    }
  }
]

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