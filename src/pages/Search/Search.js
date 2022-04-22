import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

import "./Search.css";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const url = "http://localhost:3000/products?" + searchParams;
  const { data: product, error, httpConfig, loading } = useFetch(url);

  return (
    <>
      <h1>Resultados disponiveis: </h1>
      {error && <p>{error}</p>}
      <ul className="products">
        {product &&
          product.map((product) => (
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
