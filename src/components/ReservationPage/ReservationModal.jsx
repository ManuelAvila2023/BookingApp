import { useState } from 'react';
     import './styles/ReservationModal.css';
     import useCrud from "../../hooks/useCrud"; // Ajusta la ruta según tu estructura

     const ReservationModal = ({ isOpen, book, onClose }) => {
       if (!isOpen || !book) return null;

       const [selectedRating, setSelectedRating] = useState({ value: 5, text: '⭐️⭐️⭐️⭐️⭐️' });
       const [message, setMessage] = useState('');
       const [response, getApi, postApi, deleteApi, updateApi] = useCrud();

       const handleSubmit = async (e) => {
         e.preventDefault();
         const comment = e.target.querySelector('[name="comment"]').value;
         const hotelId = book.hotel.id; // Asumiendo que book.hotel tiene una propiedad id

         setMessage(''); // Limpiar mensaje anterior
         try {
           const data = await postApi('/api/reviews', {
             rating: selectedRating.value,
             comment,
             hotelId,
           }, true); // withToken = true
           setMessage('Reseña creada exitosamente');
           onClose(); // Cierra el modal tras el éxito
         } catch (error) {
           setMessage(`Error al enviar la reseña: ${error.response?.data?.message || error.message}. Por favor, verifica el token o permisos.`);
           console.error('Error al enviar la reseña:', error);
         }
       };

       const handleOptionClick = (value, text) => {
         setSelectedRating({ value, text });
         const options = document.querySelector('.custom-select__options');
         if (options) {
           options.classList.remove('open');
         }
       };

       const reservationDays = Math.round(
         (new Date(book.checkOut).getTime() - new Date(book.checkIn).getTime()) / (1000 * 60 * 60 * 24)
       );
       const subtotalPrice = (reservationDays * Number(book.hotel.price)).toFixed(2);

       return (
         <div className="modal">
           <form className="reserve__form" onSubmit={handleSubmit}>
             <div className="reserve__form__x" onClick={onClose}>x</div>
             <h3 className="reserve__form__title">Reserve</h3>
             <article className="reserveSelected">
               <header className="reserveSelected__header">
                 <img className="reserveSelected__img" src={book.hotel.images[0].url} alt="" />
               </header>
               <section className="reserveSelected__info">
                 <h3 className="reserveSelected__name">{book.hotel.name}</h3>
                 <div className="reserveSelected__location">{book.hotel.city.name}, {book.hotel.city.country}</div>
               </section>
               <section className="reserveSelected__days__price">
                 <div className="reserveSelected__days">
                   <span className="reserveSelected__days__label">Reservation Days</span>
                   <span className="reserveSelected__days__value">{reservationDays}</span>
                 </div>
                 <div className="reserveSelected__subtotal">
                   <span className="reserveSelected__subtotal__label">Subtotal Price</span>
                   <span className="reserveSelected__subtotal__value">{subtotalPrice}</span>
                 </div>
               </section>
             </article>
             <label className="reserve__form__label reserve__label__rating">
               <span className="reserve__form__label__name">Rating</span>
               <div className="custom-select">
                 <div className="custom-select__selected" onClick={(e) => e.currentTarget.nextSibling.classList.toggle('open')}>
                   <span className="custom-rating-value" data-value={selectedRating.value}>{selectedRating.text}</span>
                 </div>
                 <div className="custom-select__options">
                   <div className="custom-select__option" data-value="5" onClick={() => handleOptionClick(5, '⭐️⭐️⭐️⭐️⭐️')}>⭐️⭐️⭐️⭐️⭐️</div>
                   <div className="custom-select__option" data-value="4" onClick={() => handleOptionClick(4, '⭐️⭐️⭐️⭐️')}>⭐️⭐️⭐️⭐️</div>
                   <div className="custom-select__option" data-value="3" onClick={() => handleOptionClick(3, '⭐️⭐️⭐️')}>⭐️⭐️⭐️</div>
                   <div className="custom-select__option" data-value="2" onClick={() => handleOptionClick(2, '⭐️⭐️')}>⭐️⭐️</div>
                   <div className="custom-select__option" data-value="1" onClick={() => handleOptionClick(1, '⭐️')}>⭐️</div>
                 </div>
               </div>
             </label>
             <label className="reserve__form__label">
               <span className="reserve__form__label__name">Comments</span>
               <textarea className="reserve__form__value reserve__form__comment__value" name="comment"></textarea>
             </label>
             {message && <p className="message">{message}</p>}
             <button className="reserve__form__btn" type="submit">Submit</button>
           </form>
         </div>
       );
     };

     export default ReservationModal;

// import { useState } from 'react';
// import './styles/ReservationModal.css'

// const ReservationModal = ({ isOpen, book, onClose }) => {
//   if (!isOpen || !book) return null;

//   const [selectedRating, setSelectedRating] = useState({ value: 5, text: '⭐️⭐️⭐️⭐️⭐️' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const comment = e.target.querySelector('[name="comment"]').value;
//     const hotelId = book.hotel.id; // Asumiendo que book.hotel tiene una propiedad id

//     try {
//       const response = await fetch('/api/reviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJqb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiZ2VuZGVyIjoibWFsZSIsImNyZWF0ZWRBdCI6IjIwMjMtMTAtMTdUMTY6NDM6MDIuNzY1WiIsInVwZGF0ZWRBdCI6IjIwMjMtMTAtMTdUMTY6NDM6MDIuNzY1WiJ9LCJpYXQiOjE2OTc1NjEwMzAsImV4cCI6MTY5NzY0NzQzMH0.h1wHPLCzdC443L4dJ8fSswM8UDotbbOfJI1HCL75Jsw', // Token inválido, necesitas uno nuevo
//         },
//         body: JSON.stringify({
//           rating: selectedRating.value,
//           comment,
//           hotelId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Fallo al enviar la reseña. Código: ' + response.status);
//       }

//       console.log('Reseña creada exitosamente');
//       onClose(); // Cierra el modal tras el éxito
//     } catch (error) {
//       console.error('Error al enviar la reseña:', error.message);
//       // Opcionalmente, podrías agregar un estado de error para mostrar un mensaje al usuario
//     }
//   };

//   const handleOptionClick = (value, text) => {
//     setSelectedRating({ value, text });
//     const options = document.querySelector('.custom-select__options');
//     if (options) {
//       options.classList.remove('open');
//     }
//   };

//   const reservationDays = Math.round(
//     (new Date(book.checkOut).getTime() - new Date(book.checkIn).getTime()) / (1000 * 60 * 60 * 24)
//   );
//   const subtotalPrice = (reservationDays * Number(book.hotel.price)).toFixed(2);

//   return (
//     <div className="modal">
//       <form className="reserve__form" onSubmit={handleSubmit}>
//         <div className="reserve__form__x" onClick={onClose}>x</div>
//         <h3 className="reserve__form__title">Reserve</h3>
//         <article className="reserveSelected">
//           <header className="reserveSelected__header">
//             <img className="reserveSelected__img" src={book.hotel.images[0].url} alt="" />
//           </header>
//           <section className="reserveSelected__info">
//             <h3 className="reserveSelected__name">{book.hotel.name}</h3>
//             <div className="reserveSelected__location">{book.hotel.city.name}, {book.hotel.city.country}</div>
//           </section>
//           <section className="reserveSelected__days__price">
//             <div className="reserveSelected__days">
//               <span className="reserveSelected__days__label">Reservation Days</span>
//               <span className="reserveSelected__days__value">{reservationDays}</span>
//             </div>
//             <div className="reserveSelected__subtotal">
//               <span className="reserveSelected__subtotal__label">Subtotal Price</span>
//               <span className="reserveSelected__subtotal__value">{subtotalPrice}</span>
//             </div>
//           </section>
//         </article>
//         <label className="reserve__form__label reserve__label__rating">
//           <span className="reserve__form__label__name">Rating</span>
//           <div className="custom-select">
//             <div className="custom-select__selected" onClick={(e) => e.currentTarget.nextSibling.classList.toggle('open')}>
//               <span className="custom-rating-value" data-value={selectedRating.value}>{selectedRating.text}</span>
//             </div>
//             <div className="custom-select__options">
//               <div className="custom-select__option" data-value="5" onClick={() => handleOptionClick(5, '⭐️⭐️⭐️⭐️⭐️')}>⭐️⭐️⭐️⭐️⭐️</div>
//               <div className="custom-select__option" data-value="4" onClick={() => handleOptionClick(4, '⭐️⭐️⭐️⭐️')}>⭐️⭐️⭐️⭐️</div>
//               <div className="custom-select__option" data-value="3" onClick={() => handleOptionClick(3, '⭐️⭐️⭐️')}>⭐️⭐️⭐️</div>
//               <div className="custom-select__option" data-value="2" onClick={() => handleOptionClick(2, '⭐️⭐️')}>⭐️⭐️</div>
//               <div className="custom-select__option" data-value="1" onClick={() => handleOptionClick(1, '⭐️')}>⭐️</div>
//             </div>
//           </div>
//         </label>
//         <label className="reserve__form__label">
//           <span className="reserve__form__label__name">Comments</span>
//           <textarea className="reserve__form__value reserve__form__comment__value" name="comment"></textarea>
//         </label>
//         <button className="reserve__form__btn" type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ReservationModal;

// import { useState, useEffect } from 'react';
// import './styles/ReservationModal.css'

// const ReservationModal = ({ isOpen, book, onClose, onSubmit }) => {
//   if (!isOpen || !book) return null;

//   const [selectedRating, setSelectedRating] = useState({ value: 5, text: '⭐️⭐️⭐️⭐️⭐️' });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(selectedRating.value, e.target.querySelector('[name="comment"]').value);
//   };

//   const handleOptionClick = (value, text) => {
//     setSelectedRating({ value, text });
//     const options = document.querySelector('.custom-select__options');
//     if (options) {
//       options.classList.remove('open');
//     }
//   };

//   const reservationDays = Math.round(
//     (new Date(book.checkOut).getTime() - new Date(book.checkIn).getTime()) / (1000 * 60 * 60 * 24)
//   );
//   const subtotalPrice = (reservationDays * Number(book.hotel.price)).toFixed(2);

//   return (
//     <div className="modal">
//       <form className="reserve__form" onSubmit={handleSubmit}>
//         <div className="reserve__form__x" onClick={onClose}>x</div>
//         <h3 className="reserve__form__title">Reserve</h3>
//         <article className="reserveSelected">
//           <header className="reserveSelected__header">
//             <img className="reserveSelected__img" src={book.hotel.images[0].url} alt="" />
//           </header>
//           <section className="reserveSelected__info">
//             <h3 className="reserveSelected__name">{book.hotel.name}</h3>
//             <div className="reserveSelected__location">{book.hotel.city.name}, {book.hotel.city.country}</div>
//           </section>
//           <section className="reserveSelected__days__price">
//             <div className="reserveSelected__days">
//               <span className="reserveSelected__days__label">Reservation Days</span>
//               <span className="reserveSelected__days__value">{reservationDays}</span>
//             </div>
//             <div className="reserveSelected__subtotal">
//               <span className="reserveSelected__subtotal__label">Subtotal Price</span>
//               <span className="reserveSelected__subtotal__value">{subtotalPrice}</span>
//             </div>
//           </section>
//         </article>
//         <label className="reserve__form__label reserve__label__rating">
//           <span className="reserve__form__label__name">Rating</span>
//           <div className="custom-select">
//             <div className="custom-select__selected" onClick={(e) => e.currentTarget.nextSibling.classList.toggle('open')}>
//               <span className="custom-rating-value" data-value={selectedRating.value}>{selectedRating.text}</span>
//             </div>
//             <div className="custom-select__options">
//               <div className="custom-select__option" data-value="5" onClick={() => handleOptionClick(5, '⭐️⭐️⭐️⭐️⭐️')}>⭐️⭐️⭐️⭐️⭐️</div>
//               <div className="custom-select__option" data-value="4" onClick={() => handleOptionClick(4, '⭐️⭐️⭐️⭐️')}>⭐️⭐️⭐️⭐️</div>
//               <div className="custom-select__option" data-value="3" onClick={() => handleOptionClick(3, '⭐️⭐️⭐️')}>⭐️⭐️⭐️</div>
//               <div className="custom-select__option" data-value="2" onClick={() => handleOptionClick(2, '⭐️⭐️')}>⭐️⭐️</div>
//               <div className="custom-select__option" data-value="1" onClick={() => handleOptionClick(1, '⭐️')}>⭐️</div>
//             </div>
//           </div>
//         </label>
//         <label className="reserve__form__label">
//           <span className="reserve__form__label__name">Comments</span>
//           <textarea className="reserve__form__value reserve__form__comment__value" name="comment"></textarea>
//         </label>
//         <button className="reserve__form__btn" type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ReservationModal;


// import './styles/ReservationModal.css'

// const ReservationModal = ({ isOpen, book, onClose, onSubmit }) => {
//   if (!isOpen || !book) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const rating = e.target.rating.value;
//     const comment = e.target.comment.value;
//     onSubmit(rating, comment);
//   };

//   const reservationDays = Math.round(
//     (new Date(book.checkOut).getTime() - new Date(book.checkIn).getTime()) / (1000 * 60 * 60 * 24)
//   );
//   const subtotalPrice = (reservationDays * Number(book.hotel.price)).toFixed(2);

//   return (
//     <div className="modal">
//       {/* <div className="modal__content"> */}
//         <form className="reserve__form" onSubmit={handleSubmit}>
//           <div className="reserve__form__x" onClick={onClose}>x</div>
//           <h3 className="reserve__form__title">Reserve</h3>
//           <article className="reserveSelected">
//             <header className="reserveSelected__header">
//               <img className="reserveSelected__img" src={book.hotel.images[0].url} alt="" />
//             </header>
//             <section className="reserveSelected__info">
//               <h3 className="reserveSelected__name">{book.hotel.name}</h3>
//               <div className="reserveSelected__location">{book.hotel.city.name}, {book.hotel.city.country}</div>
//             </section>
//             <section className="reserveSelected__days__price">
//               <div className="reserveSelected__days">
//                 <span className="reserveSelected__days__label">Reservation Days</span>
//                 <span className="reserveSelected__days__value">{reservationDays}</span>
//               </div>
//               <div className="reserveSelected__subtotal">
//                 <span className="reserveSelected__subtotal__label">Subtotal Price</span>
//                 <span className="reserveSelected__subtotal__value">{subtotalPrice}</span>
//               </div>
//             </section>
//           </article>
//           <label className="reserve__form__label reserve__label__rating">
//             <span className="reserve__form__label__name">Rating</span>
//             <select className="reserve__form__rating" name="rating">
//               <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
//               <option value="4">⭐️⭐️⭐️⭐️</option>
//               <option value="3">⭐️⭐️⭐️</option>
//               <option value="2">⭐️⭐️</option>
//               <option value="1">⭐️</option>
//             </select>
//           </label>
//           <label className="reserve__form__label">
//             <span className="reserve__form__label__name">Comments</span>
//             <textarea className="reserve__form__value reserve__form__comment__value" name="comment"></textarea>
//           </label>
//           <button className="reserve__form__btn" type="submit">Submit</button>
//         </form>
//       {/* </div> */}
//     </div>
//   );
// };

// export default ReservationModal;