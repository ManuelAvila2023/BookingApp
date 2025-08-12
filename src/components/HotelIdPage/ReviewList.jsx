import { useState, useEffect } from "react";
import useCrud from "../../hooks/useCrud";
import { renderStars } from "../../utils/starRating.jsx";
import "./styles/ReviewList.css";

const ReviewList = ({ hotelId }) => {
  const [reviewsData, getApi] = useCrud();
  const [reviews, setReviews] = useState([]); // Aquí guardamos todas las reviews con nombre incluido
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const reviewsPerPage = 5;

  // 1) Pedir todas las reviews y guardar en memoria
  const fetchReviewsAndUsers = async () => {
    setLoading(true);
    try {
      // Obtener todas las reviews del hotel
      const data = await getApi(`https://hotels-api.academlo.tech/reviews?hotelId=${hotelId}`, true);
      if (!data?.results) {
        setReviews([]);
        setLoading(false);
        return;
      }

      const allReviews = data.results;

      // 2) Extraer ids únicos de usuarios
      const uniqueUserIds = [...new Set(allReviews.map((r) => r.userId))];

      // 3) Obtener todos los usuarios de una sola vez
      // Suponiendo que la API acepte este formato de query
      const users = await getApi(`https://hotels-api.academlo.tech/users?ids=${uniqueUserIds.join(",")}`, true);

      // Crear un diccionario { userId: "Nombre Apellido" }
      const userMap = {};
      users.forEach((u) => {
        userMap[u.id] = `${u.firstName} ${u.lastName || ""}`;
      });

      // 4) Insertar nombres directamente en las reviews
      const reviewsWithNames = allReviews.map((r) => ({
        ...r,
        userFullName: userMap[r.userId] || `Usuario ${r.userId}`,
      }));

      setReviews(reviewsWithNames);
    } catch (err) {
      console.error("Error fetching reviews and users:", err);
      setReviews([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviewsAndUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId]);

  // Calcular las reseñas visibles según la página
  const visibleReviews = reviews.slice(0, page * reviewsPerPage);

  const handleShowMore = () => {
    if (!loading && reviews.length > visibleReviews.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className="reviews">
      <h2 className="reviews__title">Comments</h2>
      <div className="reviews__container">
        {visibleReviews.length > 0 ? (
          visibleReviews.map((review) => (
            <article key={review.id} className="review">
              <header className="review__header">
                <h3 className="review__user">{review.userFullName}</h3>
                <div className="review__rate">
                  <div>{renderStars(review.rating)}</div>
                  <span className="review__rate__value">{review.rating}</span>
                </div>
              </header>
              <section className="comment">
                <p className="comment__paragraph">{review.comment}</p>
              </section>
            </article>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
      {reviews.length > visibleReviews.length && (
        <button
          className="reviews__show-more"
          onClick={handleShowMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Show more"}
        </button>
      )}
    </section>
  );
};

export default ReviewList;

// import { useState, useEffect } from 'react';
// import useCrud from '../../hooks/useCrud';
// import { renderStars } from '../../utils/starRating.jsx';
// import './styles/ReviewList.css';

// const ReviewList = ({ hotelId }) => {
//   const [reviewsData, getApi] = useCrud();
//   const [reviews, setReviews] = useState([]); // Aquí guardamos todas las reviews con nombre incluido
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const reviewsPerPage = 5;

//   // 1) Pedir todas las reviews y guardar en memoria
//   const fetchReviewsAndUsers = async () => {
//     setLoading(true);
//     try {
//       // Obtener todas las reviews del hotel
//       const data = await getApi(`/api/reviews?hotelId=${hotelId}`, true);
//       if (!data?.results) {
//         setReviews([]);
//         setLoading(false);
//         return;
//       }

//       const allReviews = data.results;

//       // 2) Extraer ids únicos de usuarios
//       const uniqueUserIds = [...new Set(allReviews.map(r => r.userId))];

//       // 3) Obtener todos los usuarios de una sola vez
//       // Suponiendo que la API acepte este formato de query
//       const users = await getApi(`/api/users?ids=${uniqueUserIds.join(',')}`, true);

//       // Crear un diccionario { userId: "Nombre Apellido" }
//       const userMap = {};
//       users.forEach(u => {
//         userMap[u.id] = `${u.firstName} ${u.lastName || ''}`;
//       });

//       // 4) Insertar nombres directamente en las reviews
//       const reviewsWithNames = allReviews.map(r => ({
//         ...r,
//         userFullName: userMap[r.userId] || `Usuario ${r.userId}`
//       }));

//       setReviews(reviewsWithNames);
//     } catch (err) {
//       console.error('Error fetching reviews and users:', err);
//       setReviews([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchReviewsAndUsers();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [hotelId]);

//   // Calcular las reseñas visibles según la página
//   const visibleReviews = reviews.slice(0, page * reviewsPerPage);

//   const handleShowMore = () => {
//     if (!loading && reviews.length > visibleReviews.length) {
//       setPage(prevPage => prevPage + 1);
//     }
//   };

//   return (
//     <section className="reviews">
//       <h2 className="reviews__title">Comments</h2>
//       <div className="reviews__container">
//         {visibleReviews.length > 0 ? (
//           visibleReviews.map((review) => (
//             <article key={review.id} className="review">
//               <header className="review__header">
//                 <h3 className="review__user">{review.userFullName}</h3>
//                 <div className="review__rate">
//                   <div>{renderStars(review.rating)}</div>
//                   <span className="review__rate__value">{review.rating}</span>
//                 </div>
//               </header>
//               <section className="comment">
//                 <p className="comment__paragraph">{review.comment}</p>
//               </section>
//             </article>
//           ))
//         ) : (
//           <p>No reviews available.</p>
//         )}
//       </div>
//       {reviews.length > visibleReviews.length && (
//         <button
//           className="reviews__show-more"
//           onClick={handleShowMore}
//           disabled={loading}
//         >
//           {loading ? 'Loading...' : 'Show more'}
//         </button>
//       )}
//     </section>
//   );
// };

// export default ReviewList;


// //   import { useState, useEffect } from 'react';
// //   import useCrud from '../../hooks/useCrud';
// //   import { renderStars } from '../../utils/starRating.jsx'; // Import the renderStars function

// //   const ReviewList = ({ hotelId }) => {
// //     const [reviewsData, getApi] = useCrud();
// //     const [visibleReviews, setVisibleReviews] = useState([]);
// //     const [allReviews, setAllReviews] = useState([]);
// //     const [userNames, setUserNames] = useState({});
// //     const [page, setPage] = useState(1);
// //     const [loading, setLoading] = useState(false);
// //     const reviewsPerPage = 5;

// //     const fetchUserName = async (userId) => {
// //       if (!userId || userNames[userId]) return;

// //       try {
// //         const userData = await getApi(`/api/users/${userId}`, true);
// //         if (userData?.firstName) {
// //           setUserNames((prev) => ({
// //             ...prev,
// //             [userId]: `${userData.firstName} ${userData.lastName || ''}`,
// //           }));
// //         }
// //       } catch (err) {
// //         console.error(`Error fetching user ${userId}:`, err);
// //       }
// //     };

// //     const fetchReviews = async (url, maxRetries = 6, initialDelay = 5000) => {
// //       setLoading(true);

// //       for (let attempt = 1; attempt <= maxRetries; attempt++) {
// //         try {
// //           const offset = (page - 1) * reviewsPerPage;
// //           const params = `?hotelId=${hotelId}&offset=${offset}&perPage=${reviewsPerPage}`;
// //           const data = await getApi(`${url}${params}`, true);
// //           if (data && Array.isArray(data.results)) {
// //             setAllReviews(data.results);
// //             setVisibleReviews(data.results.slice(0, reviewsPerPage));

// //             // Fetch user names
// //             const userIds = data.results.map(r => r.userId);
// //             await Promise.all(userIds.map(fetchUserName));
// //           } else {
// //             setAllReviews([]);
// //             setVisibleReviews([]);
// //           }
// //           break;
// //         } catch (error) {
// //           if (error.response?.status === 429 && attempt < maxRetries) {
// //             const waitTime = initialDelay * Math.pow(2, attempt - 1);
// //             await new Promise((resolve) => setTimeout(resolve, waitTime));
// //           } else {
// //             setAllReviews([]);
// //             setVisibleReviews([]);
// //             break;
// //           }
// //         }
// //       }

// //       setLoading(false);
// //     };

// //     useEffect(() => {
// //       fetchReviews(`/api/reviews`);
// //       // eslint-disable-next-line react-hooks/exhaustive-deps
// //     }, [hotelId, page]);

// //     const handleShowMore = () => {
// //       if (!loading && allReviews.length >= reviewsPerPage) {
// //         setPage((prevPage) => prevPage + 1);
// //       }
// //     };

// //     return (
// //       <section className="reviews">
// //         <h2 className="reviews__title">Comentarios</h2>
// //         <div className="reviews__container">
// //           {visibleReviews.length > 0 ? (
// //             visibleReviews.map((review) => (
// //               <article key={review.id} className="review">
// //                 <header className="review__header">
// //                   <h3 className="review__user">
// //                     {userNames[review.userId]
// //                       ? userNames[review.userId]
// //                       : `Usuario ${review.userId}`}
// //                   </h3>
// //                   <div className="review__rate">
// //                     <div>{renderStars(review.rating)}</div>
// //                     <span className="review__rate__value">{review.rating}</span>
// //                   </div>
// //                 </header>
// //                 <section className="comment">
// //                   <p className="comment__paragraph">{review.comment}</p>
// //                 </section>
// //               </article>
// //             ))
// //           ) : (
// //             <p>No hay reseñas disponibles.</p>
// //           )}
// //         </div>
// //         {allReviews.length >= reviewsPerPage && (
// //           <button className="reviews__show-more" onClick={handleShowMore} disabled={loading}>
// //             {loading ? 'Cargando...' : 'Mostrar más'}
// //           </button>
// //         )}
// //       </section>
// //     );
// //   };

// //   export default ReviewList;

// // // import { useState, useEffect } from 'react';
// // // import useCrud from '../../hooks/useCrud';


// // // const ReviewList = ({ hotelId }) => {
// // //   const [reviewsData, getApi] = useCrud();
// // //   const [visibleReviews, setVisibleReviews] = useState([]);
// // //   const [allReviews, setAllReviews] = useState([]);
// // //   const [userNames, setUserNames] = useState({});
// // //   const [page, setPage] = useState(1);
// // //   const [loading, setLoading] = useState(false);
// // //   const reviewsPerPage = 5;

// // //   const fetchUserName = async (userId) => {
// // //     if (!userId || userNames[userId]) return;

// // //     try {
// // //       const userData = await getApi(`/api/users/${userId}`, true);
// // //       if (userData?.firstName) {
// // //         setUserNames((prev) => ({
// // //           ...prev,
// // //           [userId]: `${userData.firstName} ${userData.lastName || ''}`,
// // //         }));
// // //       }
// // //     } catch (err) {
// // //       console.error(`Error fetching user ${userId}:`, err);
// // //     }
// // //   };

// // //   const fetchReviews = async (url, maxRetries = 6, initialDelay = 5000) => {
// // //     setLoading(true);

// // //     for (let attempt = 1; attempt <= maxRetries; attempt++) {
// // //       try {
// // //         const offset = (page - 1) * reviewsPerPage;
// // //         const params = `?hotelId=${hotelId}&offset=${offset}&perPage=${reviewsPerPage}`;
// // //         const data = await getApi(`${url}${params}`, true);
// // //         if (data && Array.isArray(data.results)) {
// // //           setAllReviews(data.results);
// // //           setVisibleReviews(data.results.slice(0, reviewsPerPage));

// // //           // Buscar nombres de usuarios
// // //           const userIds = data.results.map(r => r.userId);
// // //           await Promise.all(userIds.map(fetchUserName));
// // //         } else {
// // //           setAllReviews([]);
// // //           setVisibleReviews([]);
// // //         }
// // //         break;
// // //       } catch (error) {
// // //         if (error.response?.status === 429 && attempt < maxRetries) {
// // //           const waitTime = initialDelay * Math.pow(2, attempt - 1);
// // //           await new Promise((resolve) => setTimeout(resolve, waitTime));
// // //         } else {
// // //           setAllReviews([]);
// // //           setVisibleReviews([]);
// // //           break;
// // //         }
// // //       }
// // //     }

// // //     setLoading(false);
// // //   };

// // //   useEffect(() => {
// // //     fetchReviews(`/api/reviews`);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [hotelId, page]);

// // //   const handleShowMore = () => {
// // //     if (!loading && allReviews.length >= reviewsPerPage) {
// // //       setPage((prevPage) => prevPage + 1);
// // //     }
// // //   };

// // //   const renderStars = (rating) => {
// // //     const maxStars = 5;
// // //     const fullStars = Math.floor(rating);
// // //     const hasHalfStar = rating % 1 >= 0.5;
// // //     const stars = [];

// // //     for (let i = 0; i < fullStars; i++) {
// // //       stars.push(<i key={`full-${i}`} className="bx bxs-star star star--full"></i>);
// // //     }

// // //     if (hasHalfStar) {
// // //       stars.push(<i key="half" className="bx bxs-star-half star star--half"></i>);
// // //     }

// // //     const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
// // //     for (let i = 0; i < emptyStars; i++) {
// // //       stars.push(<i key={`empty-${i}`} className="bx bx-star star star--empty"></i>);
// // //     }

// // //     return stars;
// // //   };

// // //   return (
// // //     <section className="reviews">
// // //       <h2 className="reviews__title">Comentarios</h2>
// // //       <div className="reviews__container">
// // //         {visibleReviews.length > 0 ? (
// // //           visibleReviews.map((review) => (
// // //             <article key={review.id} className="review">
// // //               <header className="review__header">
// // //                 <h3 className="review__user">
// // //                   {userNames[review.userId]
// // //                     ? userNames[review.userId]
// // //                     : `Usuario ${review.userId}`}
// // //                 </h3>
// // //                 <div className="review__rate">
// // //                   <div>{renderStars(review.rating)}</div>
// // //                   <span className="review__rate__value">{review.rating}</span>
// // //                 </div>
// // //               </header>
// // //               <section className="comment">
// // //                 <p className="comment__paragraph">{review.comment}</p>
// // //               </section>
// // //             </article>
// // //           ))
// // //         ) : (
// // //           <p>No hay reseñas disponibles.</p>
// // //         )}
// // //       </div>
// // //       {allReviews.length >= reviewsPerPage && (
// // //         <button className="reviews__show-more" onClick={handleShowMore} disabled={loading}>
// // //           {loading ? 'Cargando...' : 'Mostrar más'}
// // //         </button>
// // //       )}
// // //     </section>
// // //   );
// // // };

// // // export default ReviewList;
