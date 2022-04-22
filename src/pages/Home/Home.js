import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export const Home = () => {
  const url = "http://localhost:3000/products";

  const { data: items, httpConfig, loading, error, httpDelete } = useFetch(url);
  return (
    <>
      <h1>Produtos</h1>
      {error && <p>{error}</p>}
      <ul className="products">
        {items &&
          items.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>R$ {product.price}</p>
              <Link to={`/products/${product.id}`}>Detalhes</Link>
            </li>
          ))}
      </ul>
    </>
  );
};
