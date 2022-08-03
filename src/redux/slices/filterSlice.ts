import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
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
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
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

export const filterSelector = (state: RootState) => state.filter;
export const sortSelector = (state: RootState) => state.filter.sort;
export const searchSelector = (state: RootState) => state.filter.search;
export const categorySelector = (state: RootState) => state.filter.categoryId;

export const {
  setCategoryId,
  changeSort,
  changePageCount,
  changeSearchValue,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
