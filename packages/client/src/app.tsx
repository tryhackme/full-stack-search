import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import HotelDetail from "./pages/HotelDetail";
import CityDetail from "./pages/CityDetail";
import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/cities/:id" element={<CityDetail />} />
        <Route path="/countries/:id" element={<CountryDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
