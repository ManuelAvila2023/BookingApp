import { Link, useParams, Navigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import OtherHotels from "../components/HotelIdPage/OtherHotels";
import MapHotel from "../components/HotelIdPage/MapHotel";
import FormReservations from "../components/HotelIdPage/FormReservations";
import "./styles/HotelIdPage.css";
import ReviewList from "../components/HotelIdPage/ReviewList"; // Ajusta la ruta según tu estructura

const HotelIdPage = () => {
  const { id } = useParams();

  // Validar id
  if (!id) {
    console.error("ID del hotel no proporcionado");
    return <Navigate to="/hotels" replace />;
  }

  const [hotel, getHotel] = useFetch();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const url = `/api/hotels/${id}`;
    getHotel(url);
  }, [id]);

  const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bx bxs-star star star--full"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bx bxs-star-half star star--half"></i>);
    }

    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bx bx-star star star--empty"></i>);
    }

    return stars;
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : (hotel?.images?.length || 1) - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < (hotel?.images?.length || 1) - 1 ? prev + 1 : 0));
  };

  return (
    <section className="hotel">
      <header className="hotel__name">
        <h2 className="hotel__name__value">{hotel?.name || "Cargando..."}</h2>
        <div className="card__rating">         
          {renderStars(hotel?.rating)}
        </div>
        <span>{hotel?.rating || "N/A"}</span>
      </header>
      <div className="slider-container">
        <div className="slider">
          <button className="slider__btn" onClick={handlePrev}>&lt;</button>
          <div className="slider__interior__container">
            {hotel?.images?.length > 0 ? (
              <img className="slider__img" src={hotel.images[currentSlide].url} alt={`${hotel.name} - Imagen ${currentSlide + 1}`} />
            ) : (
              <p>Cargando imágenes...</p>
            )}
          </div>
          <button className="slider__btn slider__btn__next" onClick={handleNext}>&gt;</button>
        </div>
        <div className="slider-footer"></div>
      </div>
      <div className="hotel__map">
        {hotel && <MapHotel lat={hotel.lat} lon={hotel.lon} />}
      </div>
      <section className="hotel__info">
        <div className="hotel__country">
          {hotel?.city?.name}, {hotel?.city?.country}
        </div>
        <div className="hotel__direction">
          <i className="bx bx-map"></i>
          <address className="hotel__direction__value">
            {hotel?.address || "Dirección no disponible"}
          </address>
        </div>
        <p className="hotel__description">{hotel?.description || "Descripción no disponible"}</p>
      </section>
      <section>
        {localStorage.getItem("token") ? (
          <FormReservations hotelId={id} />
        ) : (
          <p>
            If you want to book, please <Link to="/login">Login</Link>
          </p>
        )}
      </section>  

      <ReviewList hotelId={id} />
      
      <OtherHotels city={hotel?.city} id={id} />
      
    </section>
  );
};

export default HotelIdPage;

// import { Link, useParams, Navigate } from "react-router-dom";
// import useFetch from "../hooks/useFetch";
// import { useEffect, useState } from "react";
// import OtherHotels from "../components/HotelIdPage/OtherHotels";
// import MapHotel from "../components/HotelIdPage/MapHotel";
// import FormReservations from "../components/HotelIdPage/FormReservations";
// import "./styles/HotelIdPage.css";
// import ReviewList from "../components/HotelIdPage/ReviewList"; // Ajusta la ruta según tu estructura

// const HotelIdPage = () => {
//   const { id } = useParams();

//   // Validar id
//   if (!id) {
//     console.error("ID del hotel no proporcionado");
//     return <Navigate to="/hotels" replace />;
//   }

//   const [hotel, getHotel] = useFetch();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//      const url = `/api/hotels/${id}`;
//      getHotel(url);
//    }, [id]);

//   const renderStars = (rating) => {
//     const maxStars = 5;
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
//     const stars = [];

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<i key={`full-${i}`} className="bx bxs-star star star--full"></i>);
//     }

//     if (hasHalfStar) {
//       stars.push(<i key="half" className="bx bxs-star-half star star--half"></i>);
//     }

//     const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<i key={`empty-${i}`} className="bx bx-star star star--empty"></i>);
//     }

//     return stars;
//   };

//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev > 0 ? prev - 1 : hotel.images.length - 1));
//   };

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev < hotel.images.length - 1 ? prev + 1 : 0));
//   };

//   const totalSlides = hotel?.images?.length || 0;
//   const translatePercentage = -(currentSlide * 100 / totalSlides);

//   return (
//     <section className="hotel">
//       <header className="hotel__name">
//         <h2 className="hotel__name__value">{hotel?.name || "Cargando..."}</h2>
//         <div className="card__rating">         
//           {renderStars(hotel?.rating)}
//         </div>
//         <span>{hotel?.rating || "N/A"}</span>
//       </header>
//       <div className="slider-container">
//         <div className="slider">
//           <button className="slider__btn" onClick={handlePrev}>&lt;</button>
//           <div className="slider__interior__container">
//             <div
//               className="slider__interior"
//               style={{ transform: `translateX(${translatePercentage}%)`, width: `${100 * (hotel?.images?.length || 1)}%` }}
//             >
//               {hotel?.images?.map((image, index) => (
//                 <div key={index} className="slider__img-container">
//                   <img className="slider__img" src={image.url} alt={`${hotel.name} - Imagen ${index + 1}`} />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button className="slider__btn slider__btn__next" onClick={handleNext}>&gt;</button>
//         </div>
//         <div className="slider-footer"></div>
//       </div>
//       <div className="hotel__map">
//         {hotel && <MapHotel lat={hotel.lat} lon={hotel.lon} />}
//       </div>
//       <section className="hotel__info">
//         <div className="hotel__country">
//           {hotel?.city?.name}, {hotel?.city?.country}
//         </div>
//         <div className="hotel__direction">
//           <i className="bx bx-map"></i>
//           <address className="hotel__direction__value">
//             {hotel?.address || "Dirección no disponible"}
//           </address>
//         </div>
//         <p className="hotel__description">{hotel?.description || "Descripción no disponible"}</p>
//       </section>
//       <section>
//         {localStorage.getItem("token") ? (
//           <FormReservations hotelId={id} />
//         ) : (
//           <p>
//             If you want to book, please <Link to="/login">Login</Link>
//           </p>
//         )}
//       </section>  

//       <ReviewList hotelId={id} />
      
//       <OtherHotels city={hotel?.city} id={id} />
      
//     </section>
//   );
// };

// export default HotelIdPage;

// // import { Link, useParams, Navigate } from "react-router-dom";
// // import useFetch from "../hooks/useFetch";
// // import { useEffect } from "react";
// // import OtherHotels from "../components/HotelIdPage/OtherHotels";
// // import MapHotel from "../components/HotelIdPage/MapHotel";
// // import FormReservations from "../components/HotelIdPage/FormReservations";
// // import "./styles/HotelIdPage.css";
// // import ReviewList from "../components/HotelIdPage/ReviewList"; // Ajusta la ruta según tu estructura

// // const HotelIdPage = () => {
// //   const { id } = useParams();
// //   // console.log("Hotel ID desde useParams:", id); // Depuración

// //   // Validar id
// //   if (!id) {
// //     console.error("ID del hotel no proporcionado");
// //     return <Navigate to="/hotels" replace />;
// //   }

// //   const [hotel, getHotel] = useFetch();

// //   useEffect(() => {
// //     const url = `/api/hotels/${id}`;
// //     getHotel(url);
// //   }, [id]);
  
// //   const renderStars = (rating) => {
// //     const maxStars = 5;
// //     const fullStars = Math.floor(rating);
// //     const hasHalfStar = rating % 1 >= 0.5;
// //     const stars = [];

// //     for (let i = 0; i < fullStars; i++) {
// //       stars.push(<i key={`full-${i}`} className="bx bxs-star star star--full"></i>);
// //     }

// //     if (hasHalfStar) {
// //       stars.push(<i key="half" className="bx bxs-star-half star star--half"></i>);
// //     }

// //     const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
// //     for (let i = 0; i < emptyStars; i++) {
// //       stars.push(<i key={`empty-${i}`} className="bx bx-star star star--empty"></i>);
// //     }

// //     return stars;
// //   };

// //   return (
// //     <section className="hotel">
// //       <header className="hotel__name">
// //         <h2 className="hotel__name__value">{hotel?.name || "Cargando..."}</h2>
// //         <div className="card__rating">         
// //           {renderStars(hotel?.rating)}
// //         </div>
// //         <span>{hotel?.rating || "N/A"}</span>
// //       </header>
// //       <div className="slider__img-container">
// //         {hotel?.images?.[0]?.url ? (
// //           <img className="slider__img" src={hotel.images[0].url} alt={hotel.name} />
// //         ) : (
// //           <p>Imagen no disponible</p>
// //         )}
// //       </div>
// //       <div className="hotel__map">
// //         {hotel && <MapHotel lat={hotel.lat} lon={hotel.lon} />}
// //       </div>
// //       <section className="hotel__info">
// //         <div className="hotel__country">
// //           {hotel?.city?.name}, {hotel?.city?.country}
// //         </div>
// //         <div className="hotel__direction">
// //           <i className="bx bx-map"></i>
// //           <address className="hotel__direction__value">
// //             {hotel?.address || "Dirección no disponible"}
// //           </address>
// //         </div>
// //         <p className="hotel__description">{hotel?.description || "Descripción no disponible"}</p>
// //       </section>
// //       <section>
// //         {localStorage.getItem("token") ? (
// //           <FormReservations hotelId={id} />
// //         ) : (
// //           <p>
// //             If you want to book, please <Link to="/login">Login</Link>
// //           </p>
// //         )}
// //       </section>  

// //       <ReviewList hotelId={id} />
      
// //       <OtherHotels city={hotel?.city} id={id} />
      
// //     </section>
// //   );
// // };

// // export default HotelIdPage;


// // // import { Link, useParams, Navigate } from "react-router-dom";
// // // import useFetch from "../hooks/useFetch";
// // // import { useEffect } from "react";
// // // import OtherHotels from "../components/HotelIdPage/OtherHotels";
// // // import MapHotel from "../components/HotelIdPage/MapHotel";
// // // import FormReservations from "../components/HotelIdPage/FormReservations";
// // // import "./styles/HotelIdPage.css";
// // // // import { renderStars } from "../utils/starRating.js";

// // // const HotelIdPage = () => {
// // //   const { id } = useParams();
// // //   // console.log("Hotel ID desde useParams:", id); // Depuración

// // //   // Validar id
// // //   if (!id) {
// // //     console.error("ID del hotel no proporcionado");
// // //     return <Navigate to="/hotels" replace />;
// // //   }

// // //   const [hotel, getHotel] = useFetch();

// // //   useEffect(() => {
// // //     const url = `/api/hotels/${id}`;
// // //     getHotel(url);
// // //   }, [id]);
  
// // //   const renderStars = (rating) => {
// // //     const maxStars = 5
// // //     const fullStars = Math.floor(rating)
// // //     const hasHalfStar = rating % 1 >= 0.5
// // //     const stars = []

// // //     // Add full stars
// // //     for (let i = 0; i < fullStars; i++) {
// // //       stars.push(<i key={`full-${i}`} className="bx bxs-star star star--full"></i>)
// // //     }

// // //     // Add half star if applicable
// // //     if (hasHalfStar) {
// // //       stars.push(<i key="half" className="bx bxs-star-half star star--half"></i>)
// // //     }

// // //     // Add empty stars to complete 5 stars
// // //     const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0)
// // //     for (let i = 0; i < emptyStars; i++) {
// // //       stars.push(<i key={`empty-${i}`} className="bx bx-star star star--empty"></i>)
// // //     }

// // //     return stars
// // //   }

// // //   return (
// // //     <section className="hotel">
// // //       <header className="hotel__name">
// // //         <h2 className="hotel__name__value">{hotel?.name || "Cargando..."}</h2>
// // //         <div className="card__rating">         
// // //           {renderStars(hotel?.rating)}
// // //         </div>
// // //         <span>{hotel?.rating || "N/A"}</span>
// // //       </header>
// // //       <div className="slider__img-container">
// // //         {hotel?.images?.[0]?.url ? (
// // //           <img className="slider__img" src={hotel.images[0].url} alt={hotel.name} />
// // //         ) : (
// // //           <p>Imagen no disponible</p>
// // //         )}
// // //       </div>
// // //       <div className="hotel__map">
// // //         {hotel && <MapHotel lat={hotel.lat} lon={hotel.lon} />}
// // //       </div>
// // //       <section className="hotel__info">
// // //         <div className="hotel__country">
// // //           {hotel?.city?.name}, {hotel?.city?.country}
// // //         </div>
// // //         <div className="hotel__direction">
// // //           <i className="bx bx-map"></i>
// // //           <address className="hotel__direction__value">
// // //             {hotel?.address || "Dirección no disponible"}
// // //           </address>
// // //         </div>
// // //         <p className="hotel__description">{hotel?.description || "Descripción no disponible"}</p>
// // //       </section>
// // //       <section>
// // //         {localStorage.getItem("token") ? (
// // //           <FormReservations hotelId={id} />
// // //         ) : (
// // //           <p>
// // //             If you want to book, please <Link to="/login">Login</Link>
// // //           </p>
// // //         )}
// // //       </section>

// // //       <OtherHotels city={hotel?.city} id={id} />
// // //     </section>
// // //   );
// // // };

// // // export default HotelIdPage;

