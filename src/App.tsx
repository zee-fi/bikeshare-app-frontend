import "./App.css";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Bikelist from "./components/Bikelist";
import Bike from "./components/Bike";
import CreateBike from "./components/CreateBike";
import Header from "./components/Header";
import CreateBooking from "./components/CreateBooking";
import About from "./pages/About";
import UpdateBike from "./components/UpdateBike";

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/bikes" element={<Bikelist />} />
        <Route path="/bikes/:bikeId" element={<Bike />} />
        <Route path="/addBike" element={<CreateBike />} />
        <Route path="/updateBike" element={<UpdateBike />} />
        <Route path="/bookings/:bikeId" element={<CreateBooking />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
