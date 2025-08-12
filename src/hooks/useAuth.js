import { useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const createUser = (data) => {
    const url = "https://hotels-api.academlo.tech/users";
    axios
      .post(url, data)
      .then((res) => {
        console.log("Usuario creado:", res.data);
      })
      .catch((err) => console.error("Error al crear usuario:", err));
  };

  const loginUser = async (data) => {
    const url = "https://hotels-api.academlo.tech/users/login"; // URL absoluta
    try {
      const response = await axios.post(url, data);
      console.log("Login exitoso:", response.data); // Depuración
      setUser(response.data.user); // Actualizar estado user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userLogged", JSON.stringify(response.data.user));
      return response.data; // Retornar datos para uso opcional
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error; // Propagar error para manejarlo en el componente
    }
  };

  return { createUser, loginUser, user };
};

export default useAuth;

// import { useState } from "react";
// import axios from "axios";

// const useAuth = () => {
//   const [user, setUser] = useState(null);

//   const createUser = (data) => {
//     axios.post('https://hotels-api.academlo.tech/users', data)
//       .catch(err => console.error(err));
//   };

//   const loginUser = async (data) => {
//     try {
//       const response = await axios.post('/api/users/login', data);
//       setUser(response.data.user);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('userLogged', JSON.stringify(response.data.user));
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return { createUser, loginUser, user };
// };

// export default useAuth;

// //corrrect
// // import { useState } from "react";
// // import axios from "axios";

// // const useAuth = () => {
// //   const [user, setUser] = useState(null);

// //   // Register
// //   const createUser = (data) => {
// //     const url = 'https://hotels-api.academlo.tech/users';
// //     axios.post(url, data)
// //       .then(res => {
// //         console.log(res.data);
// //       })
// //       .catch(err => console.log(err));
// //   };

// //   // Login
// //   const loginUser = async (data) => {
// //     const url = '/api/users/login';
// //     try {
// //       const response = await axios.post(url, data);
// //       console.log(response.data); // Log en useAuth.js:17
// //       setUser(response.data.user); // Actualizar estado user
// //       localStorage.setItem('token', response.data.token);
// //       localStorage.setItem('userLogged', JSON.stringify(response.data.user));
// //       return response.data; // Retornar datos para uso opcional
// //     } catch (error) {
// //       console.error(error);
// //       throw error; // Propagar error para manejarlo en LoginPage
// //     }
// //   };

// //   return { createUser, loginUser, user };
// // };

// // export default useAuth;

// // import axios from "axios"

// // const useAuth = () => {
// //   //Register
// //   const createUser = (data) =>{
// //     const url = 'https://hotels-api.academlo.tech/users'
// //     axios.post(url, data)
// //     .then(res => console.log(res.data))
// //     .catch(err => console.log(err) )
// //   }

// //   //login
// //   const loginUser = (data) => {
// //    const url = '/api/users/login'
// //    axios.post(url, data)
// //      .then(res => {
// //       console.log(res.data)
// //       localStorage.setItem('token', res.data.token )
// //       localStorage.setItem('userLogged', JSON.stringify(res.data.user))
// //       })
// //      .catch(err=> console.log(err))
// //   }

// //   return { createUser, loginUser }
// // }

// // export default useAuth