import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
const cart = JSON.parse(localStorage.getItem("cart"));
//Imports--------------------------

const Userslice = createSlice({
  name: "Userslice",
  initialState: {
    closelogin: false,
    showlogreg: "",
    user: user ? user : null,
    token: token ? token : null,
    category: "",
    similar: [],
    cartprs: cart ? cart : [],
  },
  reducers: {
    Setclose: (state, action) => {
      state.closelogin = action.payload;
    },
    showlogreg: (state, action) => {
      state.showlogreg = action.payload;
    },
    storeUser: (state, action) => {
      state.user = action.payload;
    },
    StoreToken: (state, action) => {
      state.token = action.payload;
    },
    categoryset: (state, action) => {
      state.category = action.payload;
    },
    setSimilar: (state, action) => {
      state.similar = action.payload;
    },
    storeCart: (state, action) => {
      state.cartprs.push(action.payload);
    },
    removeCart: (state, action) => {
      state.cartprs = action.payload;
    },
  },
});

export const {
  Setclose,
  showlogreg,
  storeUser,
  categoryset,
  StoreToken,
  setSimilar,
  storeCart,
  removeCart,
} = Userslice.actions;
export const Userreducer = Userslice.reducer;
