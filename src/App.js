import React, { Component, Profiler } from 'react'
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/dialogs/dialogsContainer';
import Music from './components/music/music';
import Navbar from './components/navbar/Navbar';
import News from './components/news/news';
import ProfileContainer from './components/profile/profileContainer';
import Settingss from './components/settingss/settingss';
import UsersContainer from './components/users/UsersContainer';
import Games from './components/games/games'
import HeaderComponent from './components/header/headerComponent';
import LoginPage from './components/login/login'
import { connect } from 'react-redux';
import { initializeApp } from "../../react_kabzda_1/src/redux/app-reducer";
import Preloader from './components/common/preloader/preloader';
import { compose } from 'redux';
import store from './redux/redux-store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';



class App extends Component {
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
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          <Route path='/news' render={() => <News />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/settingss' render={() => <Settingss />} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/games' render={() => <Games />} />
          <Route path='/login' render={() => <LoginPage />} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

let MainApp = (props) => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp