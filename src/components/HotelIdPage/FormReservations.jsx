import { useForm } from "react-hook-form";
import useCrud from "../../hooks/useCrud";
import { useState } from "react";
import "./styles/FormReservations.css";

const FormReservations = ({ hotelId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [,, createBook] = useCrud();
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success", // "success" o "error"
  });

  const showNotification = (message, type) => {
    setNotification({ isVisible: true, message, type });
    setTimeout(() => {
      setNotification({ isVisible: false, message: "", type: "success" });
    }, 3000);
  };

  const submit = async (data) => {
    // Validar hotelId
    if (!hotelId) {
      showNotification("Error: Hotel ID is not defined. Please try again.", "error");
      console.error("hotelId is null or undefined:", hotelId);
      return;
    }

    // Validar fechas
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    const today = new Date();

    if (!data.checkIn || !data.checkOut) {
      showNotification("Please fill in both check-in and check-out dates", "error");
      return;
    }
    if (checkInDate < today) {
      showNotification("Check-in date cannot be in the past", "error");
      return;
    }
    if (checkInDate >= checkOutDate) {
      showNotification("Check-out date must be after check-in date", "error");
      return;
    }

    const objData = {
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      hotelId,
    };

    try {
      await createBook("/api/bookings", objData, true);
      reset({
        checkIn: "",
        checkOut: "",
      });
      showNotification("Reservations Created! 😄", "success");
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      console.error("Error creating reservation:", errorMessage);
      showNotification(`Error creating reservation: ${errorMessage}`, "error");
    }
  };

  return (
    <section className="hotel__reservation">
      <div
        className={`app__notifications ${
          notification.isVisible ? "" : "closeNotification"
        } ${notification.type === "error" ? "errorNotification" : ""}`}
      >
        <p className="app__notifications__message">{notification.message}</p>
      </div>
      <h3 className="hotel__reservation__title">
        To proceed with your booking, please enter your details below:
      </h3>
      <form className="from__reservation" onSubmit={handleSubmit(submit)}>
        <div className="form-reservation__fields">
          <label className="form-reservation__field">
            <span className="form-reservation__label">Check-in</span>
            <input
              className="form-reservation__input"
              {...register("checkIn", { required: true })}
              type="date"
            />
          </label>
          <label className="form-reservation__field">
            <span className="form-reservation__label">Check-out</span>
            <input
              className="form-reservation__input"
              {...register("checkOut", { required: true })}
              type="date"
            />
          </label>
        </div>
        <button className="form-reservation__btn">Book now!</button>
      </form>
    </section>
  );
};

export default FormReservations;