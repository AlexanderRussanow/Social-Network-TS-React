import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
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

export const setInitializedSuccess = () => ({
    type: INITIALIZED_SUCCESS
});

// thunkcreator

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedSuccess())
        })

};


export default appReducer;
