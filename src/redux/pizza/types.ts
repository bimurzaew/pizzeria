export type PizzaItem = {
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

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
