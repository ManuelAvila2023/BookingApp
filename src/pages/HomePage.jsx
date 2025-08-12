import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsThunk } from "../store/slices/products.slice";
import HotelCard from "../components/HomePage/HotelCard";
import "./styles/HomePage.css";
import FilterName from "../components/HomePage/FilterName";
import FilterCity from "../components/HomePage/FilterCity";
import FilterPrice from "../components/HomePage/FilterPrice";

const HomePage = () => {
  const [nameSearched, setNameSearched] = useState("");
  const [fromTo, setFromTo] = useState({
    from: 0,
    to: Infinity,
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const products = useSelector((states) => states.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "/api/hotels";
    dispatch(getHotelsThunk(url));
  }, []);

  const cbFilter = (hotel) => {
    const filterName = hotel.name.toLowerCase().includes(nameSearched);
    const price = Number(hotel.price);
    const filterByPrice = price >= fromTo.from && price <= fromTo.to;
    return filterName && filterByPrice;
  };

  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

  return (
    <div>
      <div className="homepage">
        <section className={`filters ${isFiltersOpen ? 'true' : 'false'}`}>
          <header className="filters__header">
            <h2 className="filters__title">Filters</h2>
            <div className="filters__exit" onClick={handleCloseFilters}>
              x
            </div>
          </header>
          <FilterPrice setFromTo={setFromTo} />
          <FilterCity />
        </section>
        <FilterName setNameSearched={setNameSearched} setIsFiltersOpen={setIsFiltersOpen} />
        <div className="homepage__card-container">
          {products ? (
            products.filter(cbFilter).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <div>Loading hotels or error occurred...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;