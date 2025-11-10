import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  color: [],
  material: [],
  priceFrom: 0,
  priceTo: 100000,
  sortBy: "featured",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      state.category = state.category.includes(category)
        ? state.category.filter((c) => c !== category)
        : [...state.category, category];
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    toggleColor: (state, action) => {
      const color = action.payload;
      state.color = state.color.includes(color)
        ? state.color.filter((c) => c !== color)
        : [...state.color, color];
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
    toggleMaterial: (state, action) => {
      const material = action.payload;
      state.material = state.material.includes(material)
        ? state.material.filter((m) => m !== material)
        : [...state.material, material];
    },
    setPriceRange: (state, action) => {
      const { priceFrom, priceTo } = action.payload;
      state.priceFrom = priceFrom;
      state.priceTo = priceTo;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      Object.assign(state, initialState);
    },
    setFiltersFromURL: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setCategory,
  toggleCategory,
  setColor,
  toggleColor,
  setMaterial,
  toggleMaterial,
  setPriceRange,
  setSortBy,
  resetFilters,
  setFiltersFromURL,
} = filtersSlice.actions;

export const selectFilters = (state) => state.filters;
export const selectCategory = (state) => state.filters.category;
export const selectColor = (state) => state.filters.color;
export const selectMaterial = (state) => state.filters.material;
export const selectPriceRange = (state) => ({
  priceFrom: state.filters.priceFrom,
  priceTo: state.filters.priceTo,
});
export const selectSortBy = (state) => state.filters.sortBy;

export default filtersSlice.reducer;
