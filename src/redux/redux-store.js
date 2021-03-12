import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import authReducer from './auth-reducer'
import dialogsReducer from "./dialogs-Reducer"
import profileReducer from "./profile-Reducer"
import usersReducer from './users-Reducers'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'



let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store

export default store