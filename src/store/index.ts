import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "./jdListApi";

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
