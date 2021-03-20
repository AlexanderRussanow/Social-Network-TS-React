import { InferActionsType } from './redux-store';
import { getAuthUserData } from "./auth-reducer";


let initialState = {initialized: false};

export type InititialAPPStateType = typeof initialState

type APPReducerActionType = InferActionsType<typeof actions>

const appReducer = (state = initialState, action: APPReducerActionType): InititialAPPStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

// actioncreator

// type ActionsType<T> = T extends {[key: string]: infer U} ? U : never 

// type APPReducerType = ReturnType<ActionsType<typeof actions>>

export const actions = {
    setInitializedSuccess: () => ({type: "SN/APP/INITIALIZED_SUCCESS"}) as const
}

// thunkcreator

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    
    Promise.all([promise])
        .then(() => {
            dispatch(actions.setInitializedSuccess())
        })

};


export default appReducer;
