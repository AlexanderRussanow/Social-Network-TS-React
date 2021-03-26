import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Layout, Menu, Row, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { logout } from "../../redux/auth-reducer";
import "./Header.css";

export type MapPropsType = {};

export const Header: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const login = useSelector((state: AppStateType) => state.auth.login);
  const dispatch = useDispatch();
  const logoutCallback = () => {
    dispatch(logout());
  };

  const { Header } = Layout;

  return (
    <Header className="header">
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Link to="/profile"> My profile</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/dialogs">My messages</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/Users">Users</Link>
            </Menu.Item>
          </Menu>
        </Col>

        {isAuth ? (
          <>
            <Col span={1}>
              <Avatar
                alt={login || ""}
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={5}>
              <Button onClick={logoutCallback}>Log out</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to={"/login"}>Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};

//   <header className="header">
//     <img src="https://bookcamp.ru/wp-content/uploads/2018/11/logo_color_shdw-small-250.png"></img>
//     <div className="login">
//       {props.isAuth ? (
//         <div>{props.login} - <div><button onClick={props.logout}>Log out</button></div></div>
//       ) : (
//         <NavLink to={"/login"}>Login</NavLink>
//       )}
//     </div>
//   </header>
// );
