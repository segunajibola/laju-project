import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, AddNew, Navbar } from "./section/index.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-new" element={<AddNew />} />
      </Routes>
    </>
  );
}

export default App;
