import { useNavigate } from 'react-router-dom'
import './styles/HotelCard.css'

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate()
  
  const navigateHotelId = () => {
    navigate(`/hotel/${hotel.id}`)
  }

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const maxStars = 5
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bx bxs-star star star--full"></i>)
    }

    // Add half star if applicable
    if (hasHalfStar) {
      stars.push(<i key="half" className="bx bxs-star-half star star--half"></i>)
    }

    // Add empty stars to complete 5 stars
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bx bx-star star star--empty"></i>)
    }

    return stars
  }

  return (
    <article className="card">
      <header className="card__header">
        <img className="card__image" src={hotel.images[0].url} alt="" />
      </header>
      <section className="card__body">
        <h3 className="card__name">{hotel.name}</h3>
        <div className="card__rating">
          {renderStars(hotel.rating)}
          <span className="card__rating-value">{hotel.rating}</span>
        </div>
        <div className="card__city">{hotel.city.name}, {hotel.city.country}</div>
        <div className="card__price">{hotel.price}</div>
      </section>
      <footer className="card__footer">
        <button onClick={navigateHotelId} className="card__btn">See more...</button>
      </footer>
    </article>
  )
}

export default HotelCard

// import { useNavigate } from 'react-router-dom'
// import './styles/HotelCard.css'

// const HotelCard = ({ hotel }) => {

//   const navigate = useNavigate()
  
//   const navigateHotelId = () =>{
//     navigate(`/hotel/${hotel.id}`)
//   } 

//   return (
//     <article className="card">
//       <header className="card__header">
//         <img className="card__image" src={hotel.images[0].url} alt="" />
//       </header>
//       <section className="card__body">
//         <h3 className="card__name">{hotel.name}</h3>
//         <div className="card__rating">
//           <i className="bx bxs-star"></i>
//           <i className="bx bxs-star"></i>
//           <i className="bx bxs-star"></i>
//           <i className="bx bxs-star-half"></i>
//           <i className="bx bxs-star"></i>
//           <span className="card__rating-value">{hotel.rating}</span>
//         </div>
//         <div className="card__city">{hotel.city.name}, {hotel.city.country}</div>
//         <div className="card__price">{hotel.price}</div>
//       </section>
//       <footer className="card__footer">
//         <button onClick={navigateHotelId} className="card__btn">See more...</button>
//       </footer>
//     </article>
//   )
// }

// export default HotelCard


// const HotelCard = ({hotel}) => {
//   return (
//     <article>
//      <header>
//       <img src={hotel.images[0].url} alt="" />      
//      </header>
//      <section>
//       <h3>{hotel.name}</h3>
//       <div>{hotel.rating}</div>
//       <div>{hotel.city.name}, {hotel.city.country}</div>
//       <div>{hotel.price}</div>
//      </section>
//      <footer>
//       <button>See more...</button>     
//      </footer>
//     </article>
//   )
// }

