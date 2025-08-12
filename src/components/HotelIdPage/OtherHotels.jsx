import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import HotelCard from "../HomePage/HotelCard";
import "./styles/OtherHotels.css";

const OtherHotels = ({ city, id }) => {
  const [hotelsByCity, getHotelsByCity] = useFetch();

  useEffect(() => {
    if (city) {
      const url = `/hotels?cityId=${city?.id}`; // Cambiamos /api/hotels a /hotels
      getHotelsByCity(url);
    }
  }, [city]);

  return (
    <section className="otherhotel">
      <h3 className="otherhotel__title">
        Other Hotels in <span className="otherhotel__title__country">{city?.country}</span>
      </h3>
      <div className="homepage__card-container">
        {hotelsByCity?.filter((hotel) => hotel.id !== Number(id)).map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
};

export default OtherHotels;

// import { useEffect } from "react"
// import useFetch from "../../hooks/useFetch"
// import HotelCard from "../HomePage/HotelCard"
// import './styles/OtherHotels.css'
// const OtherHotels = ({city, id}) => {
//  const [hotelsByCity , getHotelsByCity] = useFetch()
//  useEffect(()=>{
//   if(city){
//    const url = `/api/hotels?cityId=${city?.id}`
//    getHotelsByCity(url)
//   }
//  },[city])

//   return (
//    <section className="otherhotel">
//     <h3 className="otherhotel__title">Other Hotels in <span className="otherhotel__title__country">{city?.country}</span></h3>
//     <div className='homepage__card-container' >
//       {
//        hotelsByCity?.filter(hotel=>hotel.id !==Number(id)).map(hotel => (
//         <HotelCard 
//          key={hotel.id}
//          hotel={hotel}
//         />                
//        ))
//       }
//      </div>
//    </section>
//   )
// }

// export default OtherHotels