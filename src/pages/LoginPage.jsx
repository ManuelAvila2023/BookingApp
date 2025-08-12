import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import "./styles/LoginPage.css";

const LoginPage = () => {
  const { handleSubmit, register, reset } = useForm();
  const { loginUser, user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      setIsLoggedIn(true);
      setErrorMessage("");
    }
  }, [user]);

  const submit = async (data) => {
    try {
      setErrorMessage("");
      await loginUser(data);
      reset({ email: "", password: "" });
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage("Credenciales incorrectas.");
      } else {
        setErrorMessage("Error al iniciar sesión.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setErrorMessage("");
    localStorage.removeItem("token");
    localStorage.removeItem("userLogged");
  };

  return (
    <div className="loginpage">
      {!isLoggedIn ? (
        <>
          <img
            className="loginpage__img"
            src="/public/images/user.png"
            alt=""
          />
          <form className="login" onSubmit={handleSubmit(submit)}>
            <h2 className="loginpage__title">User</h2>
            {errorMessage && <p className="login__error">{errorMessage}</p>}
            <div>
              <label className="login__field">
                <span className="login__label">Email</span>
                <input
                  {...register("email")}
                  className="login__input"
                  type="email"
                />
              </label>
              <label className="login__field">
                <span className="login__label">Password</span>
                <input
                  {...register("password")}
                  className="login__input"
                  type="password"
                />
              </label>
            </div>
            <button className="login__btn">Submit</button>
          </form>
        </>
      ) : (
        <div className="loginpage-container">
          <article className="loginpage user">
            <header className="user__header">
              <img
                className="user__image"
                src={
                  user.gender === "female"
                    ? "/images/female.png"
                    : "/images/male.png"
                }
                alt={user.gender === "female" ? "female avatar" : "male avatar"}
              />
            </header>
            <h2 className="user__welcome">
              Welcome,{" "}
              <span className="user__name">
                {user.firstName} {user.lastName}
              </span>
            </h2>
            <button className="user__btn" onClick={handleLogout}>
              Logout
            </button>
          </article>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

// // import { useForm } from "react-hook-form";
// // import useAuth from "../hooks/useAuth";
// // import './styles/LoginPage.css'

// // const LoginPage = () => {
// //  const {handleSubmit, register, reset} = useForm()

// //  const {loginUser} = useAuth()
// //  const submit = data =>{
// //   loginUser(data)
// //   reset({
// //    email:'',
// //    password: '',
// //   })
// //  }
// //   return (
// //     <div className='loginpage'>
// //       <img className="loginpage__img" src="/public/images/user.png" alt=""></img>
// //       <form className='login' onSubmit={handleSubmit(submit)}>
// //         <h2 className='loginpage__title'>User</h2>
// //         <div>
// //           <label className='login__field'>
// //             <span className='login__label'>Email</span>
// //             <input {...register('email')} className='login__input' type="email" />
// //           </label>
// //           <label className='login__field'>
// //             <span className='login__label'>Password</span>
// //             <input {...register('password')} className='login__input' type="password" />
// //           </label>
// //         </div>
// //         <button className='login__btn'>Submit</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default LoginPage;
