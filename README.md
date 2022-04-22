## React Router curso Udemy

Configurando o router em nossa aplicação

- Para configurar o React Router vamos ter que importar três elementos de react-router-dom;
- BrowserRouter: Define onde a área do nosso app que vai trocar as páginas;
- RoutesÇ Define as rotas;
- Route Um elemento deste para cada rota, configurar com path e coponente da rota;

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