import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route
          path="/hotels/:id"
          element={<DetailPage title="Hotel Details" />}
        />
        <Route
          path="/countries/:id"
          element={<DetailPage title="Country Details" />}
        />
        <Route
          path="/cities/:id"
          element={<DetailPage title="City Details" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
