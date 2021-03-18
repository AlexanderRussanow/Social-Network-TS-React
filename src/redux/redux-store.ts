import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import authReducer from './auth-reducer'
import dialogsReducer from "./dialogs-Reducer"
import profileReducer from "./profile-Reducer"
import usersReducer from './users-Reducers'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'



let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

})

// type RootReducerType = typeof rootReducers
// export type AppStateType = ReturnType<RootReducerType>

export type AppStateType = ReturnType<typeof rootReducers>

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

// let state: AppStateType

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store

export default store