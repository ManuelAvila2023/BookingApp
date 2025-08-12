import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import './styles/RegisterPage.css'

const RegisterPage = () => {

 const {register , handleSubmit, reset} = useForm()

 const {createUser} = useAuth()

 const submit = data =>{
  createUser(data)
  reset({
   firstName: '',
   lastName: '',
   email: '',
   password:'',
   gender: 'male'
  })
 }
  
  return (     
      <div className="register">
        <h2 className="register__title">Register</h2> 
        <form onSubmit={handleSubmit(submit)} className="form-register">                   
          <div>
            <label className="form-register__field">
              <span className="form-register__label">First name</span>
              <input className="form-register__input" {...register('firstName')} type="text" />
            </label>            
            <label className="form-register__field">
              <span className="form-register__label">Last name</span>
              <input className="form-register__input" {...register('lastName')} type="text" />
            </label>
            <label className="form-register__field">
              <span className="form-register__label">Email</span>
              <input className="form-register__input" {...register('email')} type="email" />
            </label>
            <label className="form-register__field">
              <span className="form-register__label">Password</span>
              <input className="form-register__input" {...register('password')} type="password" />
            </label>
            <label className="form-register__field">
              <span className="form-register__label">Gender</span>
              <select className="form-register__input" {...register('gender')}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <button className="form-register__btn">Submit</button>
        </form>
      </div>
  );
};

export default RegisterPage;
