import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import HotelIdPage from "./pages/HotelIdPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GeneralHeader from "./components/shared/GeneralHeader";
import ReservationPage from "./pages/ReservationPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import GeneralFooter from "./components/shared/GeneralFooter";

function App() {
  return (
    <div className="app">
      <GeneralHeader />
      <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel/:id" element={<HotelIdPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/reservation" element={<ReservationPage />} />
        </Route>
      </Routes>
      </main>
      <GeneralFooter />
    </div>
  );
}

export default App;
