import React, { Component, ComponentType } from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/preloader/preloader';
import DialogsContainer from './components/dialogs/dialogsContainer';
import Games from './components/games/games';
import HeaderComponent from './components/header/headerComponent';
import { LoginPage } from './components/login/login';
import Music from './components/music/music';
import Navbar from './components/navbar/Navbar';
import News from './components/news/news';
import ProfileContainer from './components/profile/profileContainer';
import Settingss from './components/settingss/settingss';
import { UsersPage } from './components/users/UsersContainer';
import { initializeApp } from "./redux/app-reducer";
import store, { AppStateType } from './redux/redux-store';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void 
}

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderComponent />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settingss' render={() => <Settingss />} />
            <Route path='/users' render={() => <UsersPage pageTitle={"Our Social network users:"}/>} />
            <Route path='/games' render={() => <Games />} />
            <Route path='/login' render={() => <LoginPage />} />
            <Route path='*' render={() => <div><b>404 PAGE NOT FOUND</b></div>} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

let MainApp: React.FC = () => {
  return <HashRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default MainApp