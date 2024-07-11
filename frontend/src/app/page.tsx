"use client";
import Table from "@/components/Table";
import CostumerCSVUpload from "@/components/CostumerCSVUpload";
import { setCurrentPage, setData, setPageSize, setTotalCount } from "@/redux/slicers/dataSlice";

import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import api from "@/utils/axios";


export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const totalCount = useSelector((state: RootState) => state.data.totalCount);
  const currentPage = useSelector((state: RootState) => state.data.currentPage);
  const pageSize = useSelector((state: RootState) => state.data.pageSize);

  const fetchData = async (page: number, size: number) => {
    try {
      const response = await api.get(`/costumers?page=${page}&size=${size}`);
      dispatch(setData(response.data));
      dispatch(setTotalCount(response.data.totalCount));
      dispatch(setCurrentPage(page));
      dispatch(setPageSize(size));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);
  
    return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tabela de Dados</h1>
      <CostumerCSVUpload />
      <Table
        data={data}
        totalCount={totalCount} 
        currentPage={currentPage} 
        pageSize={pageSize}
        fetchPage={fetchData}
      />
    </main>
  );
}
