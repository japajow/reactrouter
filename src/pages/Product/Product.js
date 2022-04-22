import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export const Product = () => {
  const { id } = useParams();

  const url = "http://localhost:3000/products/" + id;

  const { data: product, loading, error } = useFetch(url);

  console.log(product);

  return (
    <>
      {error && <p>Ocorreu um erro...</p>}
      {loading && <p>Carregando...</p>}
      <h2>{product && product.name}</h2>
      <p>R$ {product && product.price}</p>
    </>
  );
};
