import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<
  PizzaItem[],
  Record<string, string>
>("pizza/fetchPizzas", async (params) => {
  const { category, sortBy, order, searched, pageCount } = params;
  const { data } = await axios.get<PizzaItem[]>(
    `https://62dd52efccdf9f7ec2c4e0b8.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${searched}&page=${pageCount}&limit=4`
  );
  return data;
});
