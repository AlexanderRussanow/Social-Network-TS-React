const UPLOAD_POST = 'UPLOAD-POST'
const UPDATE_INFO = 'UPDATE-INFO'
const SET_NAME = 'SET-NAME'
const SET_AGE = 'SET-AGE'


let initialState = {
    postinformation: null,
    contactInformation: null,
    ifLookingJob: true,
    name: "",
    age: ""

}

const gameReducer = (state = initialState, acton) => {
    switch (action.type) {
        case UPLOAD_POST:
            return {
                ...state,
                postinformation: action.newPost
            }
        case UPDATE_INFO:
            return {
                ...state,
                contactInformation: action.newInformation
            }
        case SET_NAME:
            let newName = state.name
            return {
                ...state,
                name: action.newName
            }
        case SET_AGE:
            let newAge = state.age
            return {
                ...state,
                age: action.newAge
            }

        default:
            return state
    }


}

export const postaUpdateAC = (newPost) => ({type: UPLOAD_POST, newPost })
export const postaUpdateAC = (newInformation) => ({type: UPDATE_INFO, newInformation })
export const postaUpdateAC = (newName) => ({type: SET_NAME, newName })
export const postaUpdateAC = (newAge) => ({type: SET_AGE, newAge })

export default gameReducer