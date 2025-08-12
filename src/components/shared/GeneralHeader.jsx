import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/GeneralHeader.css';

const GeneralHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    console.log('Toggling nav, isNavOpen:', !isNavOpen); // Depuración
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className='header'>
      <h1>
        <Link to='/'>
          <span className='header__booking'>Booking</span>
          <span className='header__app'>App</span>
        </Link>
      </h1>
      <nav className='header__main-nav'>
        <ul className='header__list'>
          <li className='header__item'>
            <Link to="/reservation">Reservations</Link>
          </li>
          <li className='header__item'>
            <Link to='/register'>Register</Link>
          </li>
          <li className='header__item'>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
      <i className='bx bx-menu-alt-right header__menu' onClick={toggleNav}></i>
      <nav className={`header__nav ${isNavOpen ? 'nav__open' : 'nav__close'}`}>
        <ul className="header__list">
          <li className="header__item">
            <Link to="/reservation" onClick={() => setIsNavOpen(false)}>Reservation</Link>
          </li>
          <li className="header__item">
            <Link to="/register" onClick={() => setIsNavOpen(false)}>Register</Link>
          </li>
          <li className="header__item">
            <Link to="/login" onClick={() => setIsNavOpen(false)}>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default GeneralHeader;