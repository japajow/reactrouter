import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";


export const Navbar = () => {
  return <nav>
      {/* <Link to={'/'}>Home</Link>
      <Link to={'/about'}>Sobre</Link> */}
      <NavLink to={'/'} className={({isActive}) => isActive ? 'active': 'nao-ativo'}>Home</NavLink>
      <NavLink to={'/about'}>Sobre</NavLink>
  </nav>;
};
