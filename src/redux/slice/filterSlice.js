import { createSlice } from "@reduxjs/toolkit";

export interface filterState {
  categoryId: number;
  currentPage: number;
  sortType: {
    name: string,
    sortProperty: string,
  };
}

const initialState: filterState = {
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    serCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sortType = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { serCategoryId, setSortType, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
