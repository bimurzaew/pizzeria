import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  pageCount: 1,
  search: "",
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

export const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    changeSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    changePageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      if (Object.keys(action.payload).length) {
        state.pageCount = Number(action.payload.pageCount);
        state.categoryId = Number(action.payload.categoryId);
        console.log(action.payload);
        state.sort = action.payload.sort;
      } else {
        state.pageCount = 1;
        state.categoryId = 0;
        state.sort = {
          name: "популярности",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});

export const {
  setCategoryId,
  changeSort,
  changePageCount,
  changeSearchValue,
  setFilters,
} = slice.actions;
export default slice.reducer;
