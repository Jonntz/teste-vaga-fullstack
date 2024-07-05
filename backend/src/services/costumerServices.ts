import fs from 'fs';
import csv from 'csv-parser';
import { format, parse } from 'date-fns';
import path from 'path';
import { validateAndFormatCNPJ, validateAndFormatCPF } from '../utils/validators';
import { prisma } from '../prismaClient/prisma';
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


export const processCostumersByCsv = async (costumerCsvData: string): Promise<void> => {
  const rows: csvColumns[] = [];
  
  fs.createReadStream(costumerCsvData).pipe(csv())
    .on('data', (data) => rows.push(data))
    .on('end', async () => {
      for (let row of rows) {
        const validCpfOrCnpj = validateAndFormatCPF(row.nrCpfCnpj) || validateAndFormatCNPJ(row.nrCpfCnpj);
        const contractDate = format(parse(row.dtContrato, 'yyyyMMdd', new Date()), "dd/MM/yyyy");
        const vctDate = format(parse(row.dtVctPre, 'yyyyMMdd', new Date()), "dd/MM/yyyy");

        if(validCpfOrCnpj){
          await prisma.costumer.create({
            data: {
              nrInst: row.nrInst,
              nrAgencia: row.nrAgencia,	
              cdClient: row.cdClient,	
              nmClient: row.nmClient,	
              nrCpfCnpj: row.nrCpfCnpj,	
              nrContrato: row.nrContrato,	
              dtContrato: String(contractDate),	
              qtPrestacoes: row.qtPrestacoes,	
              vlTotal: formatToBRL(parseFloat(row.vlTotal)),	
              cdProduto: row.cdProduto,	
              dsProduto: row.dsProduto,	
              cdCarteira: row.cdCarteira,	
              dsCarteira: row.dsCarteira,	
              nrProposta: row.nrProposta,	
              nrPresta: row.nrPresta,	
              tpPresta: row.tpPresta,	
              nrSeqPre: row.nrSeqPre,	
              dtVctPre: String(vctDate),	
              vlPresta: formatToBRL(parseFloat(row.vlPresta)),	
              vlMora: formatToBRL(parseFloat(row.vlMora)),	
              vlMulta: formatToBRL(parseFloat(row.vlMulta)),	
              vlOutAcr: formatToBRL(parseFloat(row.vlOutAcr)),	
              vlIof: formatToBRL(parseFloat(row.vlIof)),	
              vlDescon: formatToBRL(parseFloat(row.vlDescon)),	
              vlAtual: formatToBRL(parseFloat(row.vlAtual)),	
              idSituac: row.idSituac,	
              idSitVen: row.idSitVen,
              status: isCorrectValue(parseInt(row.vlTotal), parseInt(row.qtPrestacoes), parseFloat(row.vlPresta))
            },
          });
        }
      }
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