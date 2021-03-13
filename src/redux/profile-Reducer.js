import { profileAPI, usersAPI } from "../../src/api/api";


const ADD_POST = "ADD-POST";
const SET_USERS_PROFILE = "SET-USERS-PROFILE";
const SET_USERS_STATUS = "SET-USERS-STATUS";
const DELETE_POST = 'DELETE-POST'
const UPDATE_PHOTO = 'UPDATE-PHOTO'

let initialState = {
  postData: [
    { id: 1, message: "Hi, how are you?", like: 23 },
    { id: 2, message: "this is my first try to make a post there", like: 2 },
    { id: 3, message: "Are any pretty puppy-girls there?", like: 3345 },
    { id: 4, message: "My name is Louygy or you can also call me Vinsy", like: 1 },
  ],
  profile: null,
  status: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        like: 0,
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
        newPostText: ''
      };
    }
    case SET_USERS_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_USERS_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    case DELETE_POST: {
      return {
        ...state,
        postData: state.postData.filter(p => p.id != action.postId)
      }
    }
    case UPDATE_PHOTO: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos }
      }
    }
    default:
      return state;
  }
};

export const setUsersProfile = (profile) => ({ type: SET_USERS_PROFILE, profile })

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })

export const setUserStatusAC = (status) => ({ type: SET_USERS_STATUS, status })

export const deletePost = (postId) => ({ type: DELETE_POST, postId })

export const savePhotoSuccess = (photos) => ({ type: UPDATE_PHOTO, photos })




export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersAPI.getProfile(userId)
  dispatch(setUsersProfile(response.data));
}

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export const getUserStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(setUserStatusAC(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) { dispatch(setUserStatusAC(status)) }
}

export default profileReducer;
