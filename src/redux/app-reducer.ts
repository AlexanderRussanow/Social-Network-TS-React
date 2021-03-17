import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";


export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

// actioncreator

type SetInitializedActionSuccessType = {type: typeof INITIALIZED_SUCCESS}

export const setInitializedSuccess = ():SetInitializedActionSuccessType => ({type: INITIALIZED_SUCCESS});

// thunkcreator

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedSuccess())
        })

};


export default appReducer;
