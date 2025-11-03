import { createSlice } from "@reduxjs/toolkit";

// Helper functions for session storage
const STORAGE_KEY = "productFilters";

const loadFromSessionStorage = () => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load filters from session storage:", error);
  }
  return null;
};

const saveToSessionStorage = (state) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save filters to session storage:", error);
  }
};

const initialState = {
  category: [],
  color: [],
  material: [],
  priceFrom: 0,
  priceTo: 100000,
  sortBy: "featured",
};

// Load saved filters or use initial state
const loadedState = loadFromSessionStorage() || initialState;

export const filtersSlice = createSlice({
  name: "filters",
  initialState: loadedState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      saveToSessionStorage(state);
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      if (state.category.includes(category)) {
        state.category = state.category.filter((c) => c !== category);
      } else {
        state.category.push(category);
      }
      saveToSessionStorage(state);
    },
    setColor: (state, action) => {
      state.color = action.payload;
      saveToSessionStorage(state);
    },
    toggleColor: (state, action) => {
      const color = action.payload;
      if (state.color.includes(color)) {
        state.color = state.color.filter((c) => c !== color);
      } else {
        state.color.push(color);
      }
      saveToSessionStorage(state);
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
      saveToSessionStorage(state);
    },
    toggleMaterial: (state, action) => {
      const material = action.payload;
      if (state.material.includes(material)) {
        state.material = state.material.filter((m) => m !== material);
      } else {
        state.material.push(material);
      }
      saveToSessionStorage(state);
    },
    setPriceRange: (state, action) => {
      state.priceFrom = action.payload.priceFrom;
      state.priceTo = action.payload.priceTo;
      saveToSessionStorage(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      saveToSessionStorage(state);
    },
    resetFilters: (state) => {
      Object.assign(state, initialState);
      saveToSessionStorage(state);
    },
    setFiltersFromURL: (state, action) => {
      const { category, color, material, priceFrom, priceTo, sortBy } =
        action.payload;
      if (category) state.category = category;
      if (color) state.color = color;
      if (material) state.material = material;
      if (priceFrom !== undefined) state.priceFrom = priceFrom;
      if (priceTo !== undefined) state.priceTo = priceTo;
      if (sortBy) state.sortBy = sortBy;
      saveToSessionStorage(state);
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
