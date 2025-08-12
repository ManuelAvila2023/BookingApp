import { useForm } from "react-hook-form";
import './styles/FilterPrice.css'
const FilterPrice = ({ setFromTo }) => {
  const { handleSubmit, reset, register } = useForm();
  
  const submit = data => {
    const from = Number(data.from)
    const to = Number(data.to)
    setFromTo({
      from: data.from === '' ? 0 : from,
      to: data.to === '' ? Infinity : to
    })
    reset({
      from: '',
      to: ''
    })
  }

  return (      
      <form className="price" onSubmit={handleSubmit(submit)}>
      <h3 className="price__title">Price</h3>
        <label>
          <span className="price__label">From</span>
          <input className="price__input" {...register('from')} type="number" min="0" />
        </label>
        <label>
          <span className="price__label">To</span>
          <input className="price__input" {...register('to')} type="number" min="0" />
        </label>
        <button className="price__btn" type="submit">Search</button>
      </form>
  );
};

export default FilterPrice;



//  // Función que se ejecuta al enviar el formulario
//  const submit = (data) => {
//   // Asegúrate de que los valores sean números y maneja casos vacíos
//   const from = data.from ? Number(data.from) : 0;
//   const to = data.to ? Number(data.to) : Infinity;
//   setFromTo({ from, to }); 
//   // Pasa los valores al componente padre o función que maneja el filtro
//   // if (setFromTo) {
//   //   setFromTo({ from, to });
//   // }

//   // Opcional: Resetea el formulario después de enviar
//   reset({
//     from: '',
//     to: '',
//   });
// };