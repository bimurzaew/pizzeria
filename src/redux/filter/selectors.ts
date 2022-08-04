import { RootState } from "../store";

export const filterSelector = (state: RootState) => state.filter;
export const sortSelector = (state: RootState) => state.filter.sort;
export const searchSelector = (state: RootState) => state.filter.search;
export const categorySelector = (state: RootState) => state.filter.categoryId;
