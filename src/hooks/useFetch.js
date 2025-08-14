import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [response, setResponse] = useState();

  const baseUrl = "https://hotels-api.academlo.tech";

  const getApi = (url) => {
    const fullUrl = `${baseUrl}${url.startsWith('/') ? url : '/' + url}`;
    console.log("Requesting GET (useFetch):", fullUrl); // Depuración
    axios
      .get(fullUrl)
      .then((res) => setResponse(res.data))
      .catch((err) => console.log(err));
  };

  return [response, getApi];
};

export default useFetch;

// // import axios from "axios";
// // import { useState } from "react";

// // const useFetch = () => {
// //   const [response, setResponse] = useState();

// //   const getApi = (url) => {
// //     // Usamos la URL base de la API externa
// //     const baseUrl = "https://hotels-api.academlo.tech";
// //     axios
// //       .get(`${baseUrl}${url}`)
// //       .then((res) => setResponse(res.data))
// //       .catch((err) => console.log(err));
// //   };

// //   return [response, getApi];
// // };

// // export default useFetch;

// import axios from "axios"
// import { useState } from "react"

// const useFetch = () => {

//  const [response, setResponse] = useState() 

//  const getApi = (url) => {
//   axios.get(url)
//     .then(res => setResponse(res.data))
//     .catch(err => console.log(err))
//  }  
//  return [response, getApi]
// }

// export default useFetch