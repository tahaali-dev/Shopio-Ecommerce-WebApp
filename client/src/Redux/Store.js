import { configureStore } from "@reduxjs/toolkit";
import { Userreducer } from "./LogregSlice.js";

export const Store = configureStore({
  reducer: {
    app: Userreducer,
  },
});
