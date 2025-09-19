import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiEntry"; // or wherever your apiSlice is

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // add more reducers here if you have them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
