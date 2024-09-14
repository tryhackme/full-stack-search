import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/hotels/:id" element={<DetailPage type="hotels" />} />
        <Route
          path="/countries/:id"
          element={<DetailPage type="countries" />}
        />
        <Route
          path="/cities/:id"
          element={<DetailPage type="cities" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
