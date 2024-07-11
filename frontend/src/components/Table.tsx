"use client";

import React from 'react';

interface TableProps {
  data: any[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  fetchPage: (page: number, size: number) => void;
}

const Table: React.FC<TableProps> = ({ data, totalCount, currentPage, pageSize }) => {
  const statusColor = (content: string) => {
    
    return content === 'Pagamento inconsistente' ? 'text-red-500' : 'text-blue-500';
  };

  // const headers: string[] = data?.length > 0 ? Object.keys(data[0]) : [];
  return (
    <div className="overflow-x-hidden w-max-[100%] mt-10">
      <div className="min-w-full align-middle inline-block shadow-md rounded-lg">
        {data?.length > 0 ?
          <table className="w-full table-auto divide-y divide-x divide-gray-400  shadow-md rounded-lg overflow-hidden">
            <thead className="">
              <tr>
              <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">Data do contrato</th>
                <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">Nº da Instituição</th>
                <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">Nº da Agência</th>
                <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">Código do Cliente</th>
                <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">CPF/CNPJ</th>
                <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">Nº de Prestações</th>
                <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">Valor Total</th>
                <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">Valor da Prestação</th>
                <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">Validade da Prestação</th>
                <th className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-x divide-gray-400 font-medium">
              {data?.map((item: any, index: any) => (
                <tr key={index} style={{ minWidth: '150px' }} className='text-center '>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.dtContrato}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.nrInst}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.nrAgencia}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.cdClient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.nrCpfCnpj}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.nrPresta}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">R$ {parseFloat(item.vlTotal).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">R$ {parseFloat(item.vlPresta).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.dtVctPre}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${statusColor(item.status)}`}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table> : <p>Nenhuma informação encontrada</p>}
        <div>
          {/* Adicione a paginação aqui */}
        </div>
      </div>
    </div>
  );
};

export default Table;
