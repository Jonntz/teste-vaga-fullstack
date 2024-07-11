import fs from 'fs';
import csv from 'csv-parser';
import { format, parse } from 'date-fns';
import path from 'path';
import { validateAndFormatCNPJ, validateAndFormatCPF } from '../utils/validators';
import { prisma } from '../prismaClient/prisma';
import { Prisma } from '@prisma/client';
import { formatToBRL } from '../utils/formatters';

interface csvColumns {
  nrInst: string,
  nrAgencia: string,	
  cdClient: string,	
  nmClient: string,	
  nrCpfCnpj: string,	
  nrContrato: string,	
  dtContrato: string,	
  qtPrestacoes: string,	
  vlTotal: string,	
  cdProduto: string,	
  dsProduto: string,	
  cdCarteira: string,	
  dsCarteira: string,	
  nrProposta: string,	
  nrPresta: string,	
  tpPresta: string,	
  nrSeqPre: string,	
  dtVctPre: string,	
  vlPresta: string,	
  vlMora: string,	
  vlMulta: string,	
  vlOutAcr: string,	
  vlIof: string,	
  vlDescon: string,	
  vlAtual: string,	
  idSituac: string,	
  idSitVen: string,
  status: string | null
};


export const processCostumersByCsv = async (costumerCsvData: string) => {
  const rows: Prisma.CostumerCreateInput[] = [];
  
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(costumerCsvData)
    .pipe(csv())
    .on('data', (row) => {
      const contractDate = format(parse(row.dtContrato, 'yyyyMMdd', new Date()), "dd/MM/yyyy");
      const vctDate = format(parse(row.dtVctPre, 'yyyyMMdd', new Date()), "dd/MM/yyyy");
      rows.push({
          nrInst: row.nrInst,
          nrAgencia: row.nrAgencia,
          cdClient: row.cdClient,
          nmClient: row.nmClient,
          nrCpfCnpj: row.nrCpfCnpj,
          nrContrato: row.nrContrato,
          dtContrato: contractDate,
          qtPrestacoes: row.qtPrestacoes,
          vlTotal: row.vlTotal,
          cdProduto: row.cdProduto,
          dsProduto: row.dsProduto,
          cdCarteira: row.cdCarteira,
          dsCarteira: row.dsCarteira,
          nrProposta: row.nrProposta,
          nrPresta: row.nrPresta,
          tpPresta: row.tpPresta,
          nrSeqPre: row.nrSeqPre,
          dtVctPre: vctDate,
          vlPresta: row.vlPresta,
          vlMora: row.vlMora,
          vlMulta: row.vlMulta,
          vlOutAcr: row.vlOutAcr,
          vlIof: row.vlIof,
          vlDescon: row.vlDescon,
          vlAtual: row.vlAtual,
          idSituac: row.idSituac,
          idSitVen: row.idSitVen,
          status: isCorrectValue(row.vlTotal, row.qtPrestacoes, row.vlPresta)
        });
      })
      .on('end', async () => {
        try {
          let validCpfOrCnpj;
          rows.forEach(row =>{
            validCpfOrCnpj = validateAndFormatCPF(row.nrCpfCnpj) || validateAndFormatCNPJ(row.nrCpfCnpj) as boolean;
          })
          
          if (!validCpfOrCnpj) {
            
            await prisma.costumer.createMany({
              data: rows,
            });
          }
          resolve();
          
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
    });
  
};


export const getAllCostumers = async (page:number = 1, pageSize:number = 10): Promise<csvColumns[]> => {
  const data = await prisma.costumer.findMany(
    {
      skip: (page! - 1) * pageSize!,
      take: pageSize,
    }
  );

  return data;
};


function isCorrectValue(vlTotal: number, qtPrestacoes: number, vlPresta: number) : string {
  const vlPrestaCalculated = vlTotal / qtPrestacoes;

  return vlPrestaCalculated != vlPresta ? "Pagamento inconsistente" : "OK";
}