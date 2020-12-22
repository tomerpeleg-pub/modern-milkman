import { createSlice } from "@reduxjs/toolkit";

/**
 * Get a flat array of prudcts from only the selected categories
 */
const getProducts = (state) =>
  state.categories
    .filter((category) => category.selected)
    .map((category) => category.data)
    .flat()
    .sort((a, b) => (a.price < b.price ? -1 : 1));

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    isLoading: true,
    categories: [],
    selectedCategories: [],
    products: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleCategory: (state, action) => {
      state.categories.forEach((category) => {
        if (category.id === action.payload) {
          category.selected = !category.selected;
        }
      });

      state.products = getProducts(state);
    },
    clearCategories: (state, action) => {
      state.categories = state.categories.map((category) => ({
        ...category,
        selected: false,
      }));

      state.products = getProducts(state);
    },
  },
});

export const {
  setCategories,
  setLoading,
  toggleCategory,
  clearCategories,
} = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.categories;
export const selectIsLoading = (state) => state.categories.isLoading;
export const selectProducts = (state) => state.categories.products;

export default categoriesSlice.reducer;
