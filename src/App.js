import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { About } from "./pages/About/About";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <h1>Router em React</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;