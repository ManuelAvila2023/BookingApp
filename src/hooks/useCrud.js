import axios from "axios";
import { useState } from "react";
import getConfigToken from "../services/getConfigToken";

const useCrud = () => {
  const [response, setResponse] = useState([]);

  // Base URL de la API
  const baseUrl = "https://hotels-api.academlo.tech";

  // READ
  const getApi = (url, withToken) => {
    return axios
      .get(`${baseUrl}${url}`, withToken ? getConfigToken() : {})
      .then((res) => {
        const data = res.data || [];
        setResponse(data);
        return data; // Return data for the caller
      })
      .catch((err) => {
        console.error("GET error:", err);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("userLogged");
        }
        throw err; // Re-throw for .catch in caller
      });
  };

  // CREATE
  const postApi = (url, data, withToken) => {
    return axios
      .post(`${baseUrl}${url}`, data, withToken ? getConfigToken() : {})
      .then((res) => {
        console.log("POST response:", res.data);
        setResponse((prev) => (prev ? [...prev, res.data] : [res.data]));
        return res.data;
      })
      .catch((err) => {
        console.error("POST error:", err.response?.data || err.message);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("userLogged");
        }
        throw err;
      });
  };

  // DELETE
  const deleteApi = (url, id, withToken) => {
    return axios
      .delete(`${baseUrl}${url}`, withToken ? getConfigToken() : {})
      .then((res) => {
        console.log("DELETE response:", res.data);
        setResponse((prev) => prev.filter((e) => e.id !== id));
        return res.data;
      })
      .catch((err) => {
        console.error("DELETE error:", err);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("userLogged");
        }
        throw err;
      });
  };

  // UPDATE (Placeholder)
  const updateApi = () => {
    // Implement if needed
  };

  return [response, getApi, postApi, deleteApi, updateApi];
};

export default useCrud;

// // useCrud.js
// import axios from "axios";
// import { useState } from "react";
// import getConfigToken from "../services/getConfigToken";

// const useCrud = () => {
//   const [response, setResponse] = useState([]);

//   // READ
//   const getApi = (url, withToken) => {
//     return axios
//       .get(url, withToken ? getConfigToken() : {})
//       .then((res) => {
//         setResponse(res.data || []);
//         return res.data; // Return data for the caller
//       })
//       .catch((err) => {
//         console.error("GET error:", err);
//         if (err?.response?.status === 401 || err?.response?.status === 403) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("userLogged");
//         }
//         throw err; // Re-throw for .catch in caller
//       });
//   };

//   // CREATE
//   const postApi = (url, data, withToken) => {
//     return axios
//       .post(url, data, withToken ? getConfigToken() : {})
//       .then((res) => {
//         console.log("POST response:", res.data);
//         setResponse((prev) => (prev ? [...prev, res.data] : [res.data]));
//         return res.data;
//       })
//       .catch((err) => {
//         console.error("POST error:", err.response?.data || err.message);
//         if (err?.response?.status === 401 || err?.response?.status === 403) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("userLogged");
//         }
//         throw err;
//       });
//   };

//   // DELETE
//   const deleteApi = (url, id, withToken) => {
//     return axios
//       .delete(url, withToken ? getConfigToken() : {})
//       .then((res) => {
//         console.log("DELETE response:", res.data);
//         setResponse((prev) => prev.filter((e) => id !== e.id));
//         return res.data;
//       })
//       .catch((err) => {
//         console.error("DELETE error:", err);
//         if (err?.response?.status === 401 || err?.response?.status === 403) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("userLogged");
//         }
//         throw err;
//       });
//   };

//   // UPDATE (Placeholder)
//   const updateApi = () => {
//     // Implement if needed
//   };

//   return [response, getApi, postApi, deleteApi, updateApi];
// };

// export default useCrud;
// // import axios from "axios"
// // import { useState } from "react"
// // import getConfigToken from "../services/getConfigToken"

// // const useCrud = () => {

// //  const [response, setResponse] = useState()

// //   //read

// //   const getApi= (url, withToken )=>{
// //    axios.get(url, withToken ? getConfigToken() : {})
// //      .then(res=> setResponse(res.data))
// //      .catch(err => {
// //       console.log(err)
// //       if(err?.response?.status === 401 || err?.response?.status === 403) {
// //         localStorage.removeItem('token')
// //         localStorage.removeItem('userLogged')
// //       }
// //     })
// //   }

// //   //create

// //   const postApi= (url, data, withToken)=>{
// //    axios.post(url, data, withToken ? getConfigToken() : {}) 
// //    .then(res=>{ 
// //     console.log(res.data)
// //     setResponse(response ? [...response, res.data] : [res.data])
// //    })
// //    .catch(err => {
// //     console.log(err)
// //     if(err?.response?.status === 401 || err?.response?.status === 403) {
// //       localStorage.removeItem('token')
// //       localStorage.removeItem('userLogged')
// //     }
// //   })
// //   }

// //   //delete

// //   const deleteApi= (url, id, withToken)=>{
// //    axios.delete(url, withToken ? getConfigToken() : {})
// //      .then(res => {
// //       console.log(res.data)
// //       setResponse(response.filter(e=> id !== e.id))
// //      })
// //      .catch(err => {
// //       console.log(err)
// //       if(err?.response?.status === 401 || err?.response?.status === 403) {
// //         localStorage.removeItem('token')
// //         localStorage.removeItem('userLogged')
// //       }
// //     })
   
// //   }

// //   //update

// //   const updateApi= ()=>{
   
// //   }

// //   return [response, getApi, postApi, deleteApi, updateApi]
// // }

// // export default useCrud