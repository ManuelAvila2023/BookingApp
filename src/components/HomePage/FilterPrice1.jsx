import { useForm } from "react-hook-form";

const FilterPrice = ({ setFromTo }) => {
  const { handleSubmit, reset, register } = useForm();

  const submit = (data) => {
    const from = Number(data.from);
    const to = Number(data.to);
    setFromTo({
      from: data.from === '' ? 0 : from,
      to: data.to === '' ? Infinity : to,
    });
    reset({
      from: '',
      to: '',
    });
  };

  return (
    <form className="price" onSubmit={handleSubmit(submit)}>
      <h3 className="price__title">Price</h3>
      <label>
        <span className="price__label">From</span>
        <input
          className="price__input"
          {...register('from')}
          type="number"
          min="0"
        />
      </label>
      <label>
        <span className="price__label">To</span>
        <input
          className="price__input"
          {...register('to')}
          type="number"
          min="0"
        />
      </label>
      <button className="price__btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default FilterPrice;