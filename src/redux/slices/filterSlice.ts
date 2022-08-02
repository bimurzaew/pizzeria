import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name: string;
  sortProperty: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

interface FilterSliceState {
  categoryId: number;
  pageCount: number;
  search: string;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  pageCount: 1,
  search: "",
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
    changePageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    changeSearchValue: (state, action) => {
      state.search = action.payload;
    },
    setFilters: (state, action) => {
      state.pageCount = Number(action.payload.pageCount);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;
export const sortSelector = (state: RootState) => state.filter.sort;
export const searchSelector = (state: RootState) => state.filter.search;

export const {
  setCategoryId,
  changeSort,
  changePageCount,
  changeSearchValue,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
