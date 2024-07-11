"use client";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import api from '../utils/axios';
import { setData, setTotalCount } from '../redux/slicers/dataSlice';

const CostumerCSVUpload = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await api.post('/costumers', formData, {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response.status == 200) {
          const dataResponse = await api.get('/costumers');
          dispatch(setData(dataResponse.data.data));
          dispatch(setTotalCount(dataResponse.data.totalCount));
        } else {
          console.error('Erro ao enviar arquivo CSV: ', response.statusText)
        }
      } catch (error) {
        console.error('Erro ao enviar arquivo CSV:', error);
      }
    }
  };

  return (
    <input type="file" accept=".csv" onChange={handleFileUpload} />
  );
};

export default CostumerCSVUpload;
