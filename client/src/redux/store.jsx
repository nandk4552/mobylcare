import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// Define the initial state for the store, aligning with the structure in the slice
const preloadedState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

// Create the store using configureStore, which automatically applies middleware and enables Redux DevTools
const store = configureStore({
  reducer: {
    rootReducer,
  },
  preloadedState,
});

export default store;
