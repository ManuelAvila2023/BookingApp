
import { useRef } from "react";
import "./styles/FilterName.css"
const FilterName = ({setNameSearched}) => {
 const inputSearch = useRef()
 const handleSubmit = e => {
  e.preventDefault()
  setNameSearched(inputSearch.current.value.trim().toLowerCase())
 } 
  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input className="search__input" ref={inputSearch} type="text" />
        <button className="search__btn">Search</button>
        <div className="homepage__filter__icon"><i className="bx bx-filter-alt filter__icon"></i></div>
      </form>
    </div>
  );
};

export default FilterName;