import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Info } from "./components/Info/Info";
import { Navbar } from "./components/Navbar/Navbar";
import { NotFound } from "./pages/NotFound/NotFound";
import { About } from "./pages/About/About";
import { Home } from "./pages/Home/Home";
import { Product } from "./pages/Product/Product";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { Search } from "./pages/Search/Search";

function App() {
  return (
    <div className="App">
      <h1>Router em React</h1>
      <BrowserRouter>
        <Navbar />
        <SearchForm />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id/info" element={<Info />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Navigate to={'/about'}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
