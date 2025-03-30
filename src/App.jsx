import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Response, Navbar, Offer } from "./section/index.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/feedback" element={<Response />} />
        <Route path="/offer" element={<Offer />} /> */}
      </Routes>
    </>
  );
}

export default App;
