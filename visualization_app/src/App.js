import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sample from "./sample";
import HomePage from "./pages/homepage";


export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/s" element={<Sample />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}
