import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const { setCategoryId, changeSort, changePageCount, changeSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
