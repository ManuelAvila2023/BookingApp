import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getHotelsThunk } from "../../store/slices/products.slice";
import { useDispatch } from "react-redux";
import "./styles/FilterCity.css"

const FilterCity = () => {
  const [cities, getCities] = useFetch();

  useEffect(() => {
    const url = "/api/cities";
    getCities(url);
  }, []);

const dispatch = useDispatch()

const handleCityFilter = (cityId) => {
 const url = `/api/hotels${cityId ? `?cityId=${cityId}` :""}`;
 dispatch(getHotelsThunk(url));
};

  return (
    <article className="filter-country">
      <h3 className="filter-country__title">Cities</h3>
      <ul className="filter-country__list">
        <li className="filter-country__item" onClick={() => handleCityFilter()}>ALL Cities</li>
        {cities?.map((city) => (
          <li onClick={() => handleCityFilter(city.id)} key={city.id}>
            {city.name}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FilterCity;
