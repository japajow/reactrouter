import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    }
  };

  const httpDelete = (method, id) => {
    if (method === "DELETE") {
      setConfig({
        method,
        url,
      });
      setMethod(method);
      setId(id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.log(err.message);
        setError("Houve algum erro ao carregar os dados!");
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      let json;
      if (method === "POST") {
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);
        json = await res.json();
      }

      if (method === "DELETE") {
        let url = `http://localhost:3000/products/${id}`;
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);
        json = await res.json();
      }
      setCallFetch(json);
    };
    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error, httpDelete };
};
