// import { InitialStateType } from "./auth-reducer";
import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { PhotosType, PostDataType, ProfileType } from './../types/types';

const ADD_POST = "ADD-POST";
const SET_USERS_PROFILE = "SET-USERS-PROFILE";
const SET_USERS_STATUS = "SET-USERS-STATUS";
const DELETE_POST = "DELETE-POST";
const UPDATE_PHOTO = "UPDATE-PHOTO";



let initialState = {
  postData: [
    { id: 1, message: "Hi, how are you?", like: 23 },
    { id: 2, message: "this is my first try to make a post there", like: 2 },
    { id: 3, message: "Are any pretty puppy-girls there?", like: 3345 },
    {
      id: 4,
      message: "My name is Louygy or you can also call me Vinsy",
      like: 1,
    },
  ] as Array<PostDataType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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
        newPostText: "",
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
        status: action.status,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        postData: state.postData.filter((p) => p.id != action.postId),
      };
    }
    case UPDATE_PHOTO: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export const addPostActionCreator = (
  newPostText: string
): AddPostActionCreatorType => ({
  type: ADD_POST,
  newPostText,
});

type SetUsersProfileType = {
  type: typeof SET_USERS_PROFILE;
  profile: ProfileType;
};

export const setUsersProfile = (profile: ProfileType): SetUsersProfileType => ({
  type: SET_USERS_PROFILE,
  profile,
});

type SetUserStatusACType = {
  type: typeof SET_USERS_STATUS;
  status: string;
};

export const setUserStatusAC = (status: string): SetUserStatusACType => ({
  type: SET_USERS_STATUS,
  status,
});

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePost = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId,
});

type SavePhotoSuccessType = {
  type: typeof UPDATE_PHOTO;
  photos: PhotosType;
};

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
  type: UPDATE_PHOTO,
  photos,
});

export const getUserProfile = (userId: number ) => async (dispatch: any) => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUsersProfile(response.data));
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.id;
  let response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("editProfile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export const getUserStatus = (userId: number ) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setUserStatusAC(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setUserStatusAC(status));
  }
};

export default profileReducer;
