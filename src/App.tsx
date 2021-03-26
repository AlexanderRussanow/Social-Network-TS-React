import {
  LaptopOutlined,
  NotificationOutlined, UserOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { Component, ComponentType } from "react";
import { connect, Provider } from "react-redux";
import {
  HashRouter,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import Preloader from "./components/common/preloader/preloader";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import Games from "./components/games/games";
import { Header } from "./components/header/header";
import { LoginPage } from "./components/login/login";
import Music from "./components/music/music";
import News from "./components/news/news";
import ProfileContainer from "./components/profile/profileContainer";
import Settingss from "./components/settingss/settingss";
import { UsersPage } from "./components/users/UsersContainer";
import { initializeApp } from "./redux/app-reducer";
import store, { AppStateType } from "./redux/redux-store";

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <Layout>
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1"><Link to="/profile"> Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" icon={<NotificationOutlined />} title="Find a friend">
                    <Menu.Item key="3"><Link to="/Users">Users</Link></Menu.Item>
                </SubMenu>

                <SubMenu key="sub3" icon={<LaptopOutlined />} title="Entertaiment" >
                  <Menu.Item key="4"><Link to="/news">News</Link></Menu.Item>
                  <Menu.Item key="5"><Link to="/music">Music</Link></Menu.Item>
                  <Menu.Item key="6"><Link to="/Games">Games</Link></Menu.Item>
                </SubMenu>

                <SubMenu key="sub4" icon={<NotificationOutlined />} title="Page options" >
                  <Menu.Item key="7"><Link to="/Settingss">Setings</Link></Menu.Item>
                </SubMenu>
              </Menu>

            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Switch>
      
                <Route exact path="/" render={() => <Redirect to={"/profile"} />}/>
                <Route path="/dialogs" render={() => <DialogsContainer />} />
                <Route path="/profile/:userId?" render={() => <ProfileContainer />}/>
                <Route path="/news" render={() => <News />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/settingss" render={() => <Settingss />} />
                <Route path="/users" render={() => (<UsersPage pageTitle={"Our Social network users:"} /> )} />
                <Route path="/games" render={() => <Games />} />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="*" render={() => (<div><b>404 PAGE NOT FOUND</b></div>)}/>
                
              </Switch>
            </Content>
          </Layout>
        </Content>


        <Footer style={{ textAlign: "center" }}>
            Social network project 2021
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

let MainApp: React.FC = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};

export default MainApp;

//   <div className='app-wrapper'>
//     <HeaderComponent />
//     < bar />
//     <div className='app-wrapper-content'>
//       <Switch>
//         <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
//         <Route path='/dialogs' render={() => <DialogsContainer />} />
//         <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
//         <Route path='/news' render={() => <News />} />
//         <Route path='/music' render={() => <Music />} />
//         <Route path='/settingss' render={() => <Settingss />} />
//         <Route path='/users' render={() => <UsersPage pageTitle={"Our Social network users:"}/>} />
//         <Route path='/games' render={() => <Games />} />
//         <Route path='/login' render={() => <LoginPage />} />
//         <Route path='*' render={() => <div><b>404 PAGE NOT FOUND</b></div>} />
//       </Switch>
//     </div>
//   </div>
