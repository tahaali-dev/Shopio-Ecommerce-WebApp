import { configureStore } from "@reduxjs/toolkit";
import { Userreducer } from "./LogregSlice.js";
import { cartReducer } from "./cart.js";

export const Store = configureStore({
  reducer: {
    app: Userreducer,
    cart: cartReducer,
  },
});
