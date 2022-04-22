## React Router curso Udemy

Configurando o router em nossa aplicação

- Para configurar o React Router vamos ter que importar três elementos de react-router-dom;
- BrowserRouter: Define onde a área do nosso app que vai trocar as páginas;
- Routes: Define as rotas;
- Route: Um elemento deste para cada rota, configurar com path e coponente da rota;

App.js importando

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// usando

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <h1>Router em React</h1>
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>;
//     </div>
//   );
// }

// export default App;
```

criamos uma pasta src/pages/Home

```tsx
import React from "react";
import "./Home.css";

export const Home = () => {
  return <div>Home</div>;
};
```

criando mais uma Route

```tsx
// <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
//   </Routes>
// </BrowserRouter>
```

criando pages/About/About.js

```tsx
import React from "react";
import "./About.css";
export const About = () => {
  return <div>About</div>;
};
```

## Adicionando Links

- Para criar links as páginas vamos precisar do Link importanto ele em nosso projeto;
- No Link configuramos o parâmetro to, que recebe a URL/path que será redirecionado quem clicar no link;
- Vamos criar um componente de Navbar para isso

Criando pasta src/components/Navbar.js Navbar.css

```tsx
// importando o Link
import { Link } from "react-router-dom";

// usamos o Link

export const Navbar = () => {
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
    </nav>
  );
};
```

importamos o nosso component Navbar no App.js

```tsx
// <BrowserRouter>
<Navbar />
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/about" element={<About />} />
//   </Routes>
// </BrowserRouter>
```

Estilizando a navbar

```css
nav {
  display: flex;
  justify-content: center;
}

nav a {
  margin: 0 10px;
  padding: 5px;
  text-decoration: none;
  color: #000;
}

nav a:hover {
  color: #ccc;
}

.active {
  background-color: #000;
  color: #fff;
}
```

## Carregando dados

- Vamos exercitar novamente o carregamento de dados com nosso hook useFetch();
- Depois poderemos utilizá-los para o carregamento de dados individuais;
- Utilizaremos o hook igual ao da última seção e vamos imprimir os produtos na Home da mesma forma;

Copiando o hook/useFech.js da ultima seção para o nosso projeto atual

```tsx
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
```

Carregando os dados
Home.js

```tsx
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
      <ul>
        {items &&
          items.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>R$ {product.price}</p>
            </li>
          ))}
      </ul>
    </>
  );
};
```

Estilizando a home.js

```css
.products {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.products li {
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  list-style: none;
  margin: 0 10px;
  width: 25%;
}
```

## Rota dinâmica

- Para criar uma rota dinâmica vamos precisar uma nova Route em App.js;
- Que deve ter o padrão de/product:id/;
- Onde :id é o dinâmico, ou seja, podemos ter qualquer valor;
- Na página podemos utilizar o hook useParams() para resgatar esta informação;

Criando pasta src/pages/Product/Product.js

```tsx
import React from "react";

export const Product = () => {
  return <div>Product</div>;
};
```

acrescentando uma nova rota para o product

```tsx
// <BrowserRouter>
//   <Navbar />
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/about" element={<About />} />
<Route path="/products/:id" element={<Product />} />
//   </Routes>
// </BrowserRouter>
```

Vamos no component Home.js

```tsx
// acrecentamos o Link no produto

<li key={product.id}>
  <h2>{product.name}</h2>
  <p>R$ {product.price}</p>
  <Link to={`/products/${product.id}`}>Detalhes</Link>
</li>
```

Utilizando agora o useParams() para trazer o id que o usuario acessa a pagina

```tsx
import { useParams } from "react-router-dom";
const { id } = useParams(); // assim conseguimos pegar o id 
```
