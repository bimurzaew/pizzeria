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

export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
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
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const pizzaDataSelector = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
