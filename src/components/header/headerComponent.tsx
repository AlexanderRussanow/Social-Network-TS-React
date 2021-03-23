import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import "./Header.css";
import Header, { MapPropsType, DispatchPropsType } from "./header";

class HeaderComponent extends React.Component<MapPropsType & DispatchPropsType> {
  
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({isAuth: state.auth.isAuth, login: state.auth.login} as MapPropsType);

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderComponent);

