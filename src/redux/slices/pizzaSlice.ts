import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type PizzaItem = {
  category: number;
  description: string;
  id: string;
  imageUrl: string;
  sizes: number[];
  title: string;
  price: number;
  types: number[];
};

interface PizzaSliceState {
  items: PizzaItem[];
  status: "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};

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

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const pizzaDataSelector = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
