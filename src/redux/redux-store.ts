import { createStore, combineReducers, applyMiddleware, compose, Action } from 'redux'
import { ThunkAction } from "redux-thunk";
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

export type AppStateType = ReturnType<typeof rootReducers>
export type InferActionsType<T> = T extends {[keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>;


// type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>




// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store

export default store