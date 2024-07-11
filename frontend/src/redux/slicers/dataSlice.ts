import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  data: any[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const initialState: DataState = {
  data: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    }
  },
});

export const { setData, setTotalCount, setCurrentPage, setPageSize } = dataSlice.actions;
export default dataSlice.reducer;
