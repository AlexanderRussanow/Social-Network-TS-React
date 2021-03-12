import React from "react";
import { NavLink } from "react-router-dom";
import { setUserData } from "../../redux/auth-reducer";
import "./Header.css";

const Header = (props) => {
  return (
    <header className="header">
      <img src="https://bookcamp.ru/wp-content/uploads/2018/11/logo_color_shdw-small-250.png"></img>
      <div className="login">
        {props.isAuth ? (
          <div>{props.login} - <div><button onClick={props.logout}>Log out</button></div></div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
