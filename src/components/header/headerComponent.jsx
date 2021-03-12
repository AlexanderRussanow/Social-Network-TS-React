import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import "./Header.css";
import Header from "./header.jsx";

class HeaderComponent extends React.Component {
  
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({isAuth: state.auth.isAuth, login: state.auth.login});

export default connect(mapStateToProps, {logout})(HeaderComponent);

