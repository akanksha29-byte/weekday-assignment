import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "./jdListApi";
import jdReducer from "./jdListSlice";

export const store = configureStore({
  reducer: {
    jdReducer: jdReducer,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
