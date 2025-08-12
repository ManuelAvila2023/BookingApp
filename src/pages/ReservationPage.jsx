import { useEffect, useState } from "react";
import useCrud from "../hooks/useCrud";
import BookCard from "../components/ReservationPage/BookCard";
import ReservationModal from "../components/ReservationPage/ReservationModal";
import "./styles/ReservationPage1.css";


const ReservationPage = () => {
  const [reservations, getReservations, , deleteReservation] = useCrud();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const url = "/api/bookings";
    setLoading(true);
    getReservations(url, true)
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleSubmit = (rating, comment) => {
    console.log("Rating:", rating, "Comment:", comment);
    closeModal();
  };

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <article className="reservations">
      <h2 className="reservations__title">Active Reservations</h2>
      
      <div className="reservations__container">
        {reservations.length > 0 ? (
          reservations.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              deleteReservation={deleteReservation}
              openModal={() => openModal(book)}
            />
          ))
        ) : (
          <p>No active reservations found.</p>
        )}
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        book={selectedBook}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </article>
  );
};

export default ReservationPage;

// // ReservationPage.jsx
// import { useEffect, useState } from "react";
// import useCrud from "../hooks/useCrud";
// import BookCard from "../components/ReservationPage/BookCard";
// import "./styles/ReservationPage1.css";

// const ReservationPage = () => {
//   const [reservations, getReservations, , deleteReservation] = useCrud();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const url = "/api/bookings";
//     setLoading(true);
//     getReservations(url, true)
//       .then(() => setLoading(false))
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Log reservations only when it changes
//   // useEffect(() => {
//   //   console.log("Reservations:", reservations);
//   // }, [reservations]);

//   if (loading) {
//     return <div>Loading reservations...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <article className="reservations">
//       <h2 className="reservations__title">Active Reservations</h2>
//       <div className="reservations__container">
//         {reservations.length > 0 ? (
//           reservations.map((book) => (
//             <BookCard
//               key={book.id}
//               book={book}
//               deleteReservation={deleteReservation}
//             />
//           ))
//         ) : (
//           <p>No active reservations found.</p>
//         )}
//       </div>
//     </article>
//   );
// };

// export default ReservationPage;

// // import { useEffect } from "react";
// // import useCrud from "../hooks/useCrud";
// // import BookCard from "../components/ReservationPage/BookCard";
// // import "./styles/ReservationPage1.css"

// // const ReservationPage = () => {
// //   const [reservations, getReservations,, deleteReservation] = useCrud();

// //   useEffect(() => {
// //     const url = "/api/bookings";
// //     getReservations(url, true);
// //   }, []);

// //    console.log(reservations);
// //   return (
// //     <article className="reservations">
// //       <h2 className="reservations__title">Active Reservations</h2>
// //       <div className="reservations__container">
// //         {reservations?.map(book => (
// //           <BookCard key={book.id} book={book} deleteReservation={deleteReservation}/>
// //         ))}
// //       </div>
// //     </article>
// //   );
// // };

// // export default ReservationPage