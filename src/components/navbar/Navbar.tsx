import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";


const Navbar: React.FC = () => {
  
  return (
    <nav className={`${s.nav} + ${s.item}`}>
      <div>
        <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
      </div>
      <div>
        <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
      </div>
      <div>
        <NavLink to='/news' activeClassName={s.active}>News</NavLink>
      </div>
      <div>
        <NavLink to='/music' activeClassName={s.active}>Music</NavLink>
      </div>
      <div>
        <NavLink to='/Settingss' activeClassName={s.active}>Setings</NavLink>
      </div>
      <div>
        <NavLink to='/Users' activeClassName={s.active}>Users</NavLink>
      </div>
      <div>
        <NavLink to='/Games' activeClassName={s.active}>Games</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
