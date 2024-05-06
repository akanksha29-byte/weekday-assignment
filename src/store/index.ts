import { configureStore } from "@reduxjs/toolkit";
import jdReducer from "./jdListSlice";

export const store = configureStore({
  reducer: {
    jdReducer: jdReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
