import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "users/fetchPizzasStatus",
  async (params) => {
    const { order, currentPage, sortType, searchValue, categoryId } = params;
    const { data } = await axios.get(
      `https://65a5775952f07a8b4a3f327d.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sortProperty}&order=${order ? "asc" : "desc"}${
        searchValue ? `&search=${searchValue}` : ""
      }`
    );
    return data;
  }
);

const initialState = {
  pizzas: [],
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("Fetching pizzas..."); // Вывод в консоль
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pizzas = action.payload;
        console.log("Fetch succeeded:", action.payload); // Вывод в консоль
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log("Fetch failed:", action.payload); // Вывод в консоль
      });
  },
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
