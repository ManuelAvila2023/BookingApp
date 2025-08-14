import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfigToken from "../../services/getConfigToken";

export const productsSlice = createSlice({
  name: "products",
  initialState: null,
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const getHotelsThunk = (url) => (dispatch) => {
  const baseUrl = "https://hotels-api.academlo.tech";
  const fullUrl = `${baseUrl}${url.startsWith("/") ? url : "/" + url}`;
  console.log("Requesting hotels with URL:", fullUrl); // Depuración

  axios
    .get(fullUrl)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => {
      console.error("Error fetching hotels:", err);
      // Opcional: manejar errores 401/403 como en useCrud.js
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userLogged");
      }
    });
};

// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const productsSlice = createSlice({
//   name: 'products',
//   initialState: null,
//   reducers: {
//     setProducts: (state, action) => action.payload
//   }
// });

// export const { setProducts } = productsSlice.actions;

// export default productsSlice.reducer;

// export const getHotelsThunk = (url) => (dispatch) =>{
//  axios.get(url)
//    .then(res => dispatch(setProducts(res.data)))
//    .catch(err => console.log(err))   
// }