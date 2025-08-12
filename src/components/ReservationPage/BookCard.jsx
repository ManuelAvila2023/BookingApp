import "./styles/BookCard1.css";

const BookCard = ({ book, deleteReservation, openModal }) => {
  const initialDate = new Date(book.checkIn).getTime();
  const finalDate = new Date(book.checkOut).getTime();
  const reservationDays = Math.round((finalDate - initialDate) / (1000 * 60 * 60 * 24)); // Redondeo explícito

  const handleDelete = () => {
    const url = `/bookings/${book.id}`; // Cambiamos /api/bookings a /bookings
    deleteReservation(url, book.id, true);
  };

  return (
    <section className="reserve">
      <header className="reserve__header">
        <img className="reserve__img" src={book.hotel.images[0].url} alt={book.hotel.name} />
      </header>
      <div className="reserve__info">
        <h3 className="reserve__name">{book.hotel.name}</h3>
        <div>
          {book.hotel.city.name}, {book.hotel.city.country}
        </div>
        <p className="reserve__location">
          Rate and comment this visit...{' '}
          <a
            href="#"
            className="reserve__comment"
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            CLICK HERE!
          </a>
        </p>
      </div>
      <div className="reserve__days__price">
        <div className="reserve__days">
          <span className="reserve__days__label">Reservation Days</span>
          <span className="reserve__days__value">{reservationDays}</span>
        </div>
        <div className="reserve__subtotal">
          <span className="reserve__subtotal__label">SUBTOTAL PRICE</span>
          <span className="reserve__subtotal__value">
            {reservationDays * Number(book.hotel.price).toFixed(2)}
          </span>
        </div>
      </div>
      <button onClick={handleDelete} className="reserve__delete">
        <i className="bx bx-trash"></i>
      </button>
    </section>
  );
};

export default BookCard;

// import './styles/BookCard1.css';

// const BookCard = ({ book, deleteReservation, openModal }) => {
//   const initialDate = new Date(book.checkIn).getTime();
//   const finalDate = new Date(book.checkOut).getTime();
//   const reservationDays = (finalDate - initialDate) / (1000 * 60 * 60 * 24);

//   const handleDelete = () => {
//     const url = `/api/bookings/${book.id}`;
//     deleteReservation(url, book.id, true);
//   };

//   return (
//     <section className="reserve">
//       <header className="reserve__header">
//         <img className="reserve__img" src={book.hotel.images[0].url} alt="" />
//       </header>
//       <div className="reserve__info">
//         <h3 className="reserve__name">{book.hotel.name}</h3>
//         <div>
//           {book.hotel.city.name}, {book.hotel.city.country}
//         </div>
//         <p className="reserve__location">
//           Rate and comment this visit...{' '}
//           <a
//             href="#"
//             className="reserve__comment"
//             onClick={(e) => {
//               e.preventDefault();
//               openModal();
//             }}
//           >
//             CLICK HERE!
//           </a>
//         </p>
//       </div>
//       <div className="reserve__days__price">
//         <div className="reserve__days">
//           <span className="reserve__days__label">Reservation Days</span>
//           <span className="reserve__days__value">{Math.round(reservationDays)}</span>
//         </div>
//         <div className="reserve__subtotal">
//           <span className="reserve__subtotal__label">SUBTOTAL PRICE</span>
//           <span className="reserve__subtotal__value">{(Math.round(reservationDays) * Number(book.hotel.price)).toFixed(2)}</span>
//         </div>
//       </div>
//       <button onClick={handleDelete} className="reserve__delete">
//         <i className="bx bx-trash"></i>
//       </button>
//     </section>
//   );
// };

// export default BookCard;


// // import './styles/BookCard1.css'
// // const BookCard = ({ book, deleteReservation }) => {
// //   const initialDate = new Date(book.checkIn).getTime();
// //   const finalDate = new Date(book.checkOut).getTime();
// //   const reservationDays = (finalDate - initialDate) / (1000 * 60 * 60 * 24);

// //   const handleDelete = () => {
// //     const url = `/api/bookings/${book.id}`;
// //     deleteReservation(url, book.id, true);
// //   };

// //   return (
// //     <section className="reserve">
// //       <header className="reserve__header">
// //         <img className="reserve__img" src={book.hotel.images[0].url} alt="" />
// //       </header>
// //       <div className="reserve__info">
// //         <h3 className='reserve__name'>{book.hotel.name}</h3>
// //         <div>
// //           {book.hotel.city.name}, {book.hotel.city.country}
// //         </div>
// //         <p className="reserve__location">
// //           Rate and comment this visit... <a href="#" className="reserve__comment">CLICK HERE!</a>
// //         </p>
// //       </div>
// //       <div className="reserve__days__price">
// //         <div className='reserve__days'>
// //           <span className='reserve__days__label'>Reservation Days</span>
// //           {/* <br /> */}
// //           <span className='reserve__days__value'>{reservationDays}</span>
// //         </div>
// //         <div className='reserve__subtotal'>
// //           <span className='reserve__subtotal__label'>SUBTOTAL PRICE</span>
// //           {/* <br /> */}
// //           <span className='reserve__subtotal__value'> {reservationDays * Number(book.hotel.price)}</span>
// //         </div>
// //       </div>
// //       <button onClick={handleDelete} className="reserve__delete">
// //         <i className="bx bx-trash"></i>
// //       </button>
// //     </section>
// //   );
// // };

// // export default BookCard;
// // // const BookCard = ({ book, deleteReservation }) => {
// // //   const initialDate = (new Date(book.checkIn)).getTime()
// // //   const finalDate = (new Date(book.checkOut)).getTime()
// // //   const reservationDays = (finalDate - initialDate) / (1000 * 60 * 60 * 24)

// // //   const handleDelete = () => {
// // //     const url = `/api/bookings/${book.id}`
// // //     deleteReservation(url, book.id, true)
// // //   }

// // //   return (
// // //     <section className="reserve">
// // //       <header className="reserve__header">
// // //         <img className="reserve__img" src={book.hotel.images[0].url} alt="" />
// // //       </header>
// // //       <h3>{book.hotel.name}</h3>
// // //       <div>{book.hotel.city.name}, {book.hotel.city.country}</div>
// // //       <p>Rate and comment this visit... <a>CLICK HERE!</a></p>
// // //       <ul>
// // //         <li><span>Reservation Days</span><span>{reservationDays}</span></li>
// // //         <li><span>SUBTOTAL PRICE</span><span>{reservationDays * Number(book.hotel.price)}</span></li>
// // //       </ul>
// // //       <button onClick={handleDelete} className="card__btn"><i className="bx bx-trash"></i></button>
// // //     </section>
// // //   )
// // // }

// // // export default BookCard