import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
//Imports--------------------------

const Userslice = createSlice({
  name: "Userslice",
  initialState: {
    closelogin: false,
    showlogreg: "",
    user: user ? user : null,
    token: token ? token : null,
    category: "",
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
  },
});

export const { Setclose, showlogreg, storeUser, categoryset, StoreToken } =
  Userslice.actions;
export const Userreducer = Userslice.reducer;
