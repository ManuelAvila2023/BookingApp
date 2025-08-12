import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getHotelsThunk } from "../../store/slices/products.slice";
import { useDispatch } from "react-redux";

const FilterCity = () => {
  const [cities, getCities, loading, error] = useFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://hotels-api.academlo.tech/cities"; // Cambiamos de /api/cities a /cities
    getCities(url);
  }, []);

  const handleCityFilter = (cityId) => {
    const url = `https://hotels-api.academlo.tech/hotels${cityId ? `?cityId=${cityId}` : ""}`; // Cambiamos de /api/hotels a /hotels
    dispatch(getHotelsThunk(url));
  };

  if (error) {
    return <div>Error loading cities: {error.message}</div>;
  }

  return (
    <article className="filter-country">
      <h3 className="filter-country__title">Cities</h3>
      <ul className="filter-country__list">
        <li
          className="filter-country__item"
          onClick={() => handleCityFilter()}
        >
          All Cities
        </li>
        {cities?.map((city) => (
          <li
            className="filter-country__item"
            onClick={() => handleCityFilter(city.id)}
            key={city.id}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FilterCity;

// import { useEffect } from "react";
// import useFetch from "../../hooks/useFetch";
// import { getHotelsThunk } from "../../store/slices/products.slice";
// import { useDispatch } from "react-redux";

// const FilterCity = () => {
//   const [cities, getCities, loading, error] = useFetch();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const url = "/api/cities";
//     getCities(url);
//   }, []);

//   const handleCityFilter = (cityId) => {
//     const url = `/api/hotels${cityId ? `?cityId=${cityId}` : ""}`;
//     dispatch(getHotelsThunk(url));
//   };

//   if (error) {
//     return <div>Error loading cities: {error.message}</div>;
//   }

//   return (
//     <article className="filter-country">
//       <h3 className="filter-country__title">Cities</h3>
//       <ul className="filter-country__list">
//         <li
//           className="filter-country__item"
//           onClick={() => handleCityFilter()}
//         >
//           All Cities
//         </li>
//         {cities?.map((city) => (
//           <li
//             className="filter-country__item"
//             onClick={() => handleCityFilter(city.id)}
//             key={city.id}
//           >
//             {city.name}
//           </li>
//         ))}
//       </ul>
//     </article>
//   );
// };

// export default FilterCity;