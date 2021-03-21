import { Dispatch } from "redux";
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI";
import { PhotosType, PostDataType, ProfileType } from './../types/types';
import { BaseThunkType, InferActionsType } from "./redux-store";


type InitialStateType = typeof initialState;
type ActionType = InferActionsType <typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction >


let initialState = {
  postData: [
    { id: 1, message: "Hi, how are you?", like: 23 },
    { id: 2, message: "this is my first try to make a post there", like: 2 },
    { id: 3, message: "Are any pretty puppy-girls there?", like: 3345 },
    { id: 4, message: "My name is Louygy or you can also call me Vinsy", like: 1 }] as Array<PostDataType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
};



const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD-POST": {
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
    case "SN/PROFILE/SET-USERS-PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case "SN/PROFILE/SET-USERS-STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "SN/PROFILE/DELETE-POST": {
      return {
        ...state,
        postData: state.postData.filter((p) => p.id != action.postId),
      };
    }
    case "SN/PROFILE/UPDATE-PHOTO": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};



export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: "SN/PROFILE/ADD-POST", newPostText} as const),
    setUsersProfile: (profile: ProfileType) => ({type: "SN/PROFILE/SET-USERS-PROFILE", profile} as const),
    setUserStatusAC: (status: string) => ({type: "SN/PROFILE/SET-USERS-STATUS", status} as const),
    deletePost: (postId: number) => ({type: "SN/PROFILE/DELETE-POST", postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: "SN/PROFILE/UPDATE-PHOTO", photos} as const)
}




// thunks

export const getUserProfile = (userId: number ): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userId);
  dispatch(actions.setUsersProfile(data));
};

export const getUserStatus = (userId: number ): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(actions.setUserStatusAC(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(actions.setUserStatusAC(status));
  }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.id;
  let data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    if (userId != null) {
      dispatch(getUserProfile(userId))
    } else {
      throw new Error("UserId can't be null")
    }
    ;
  } else {
    dispatch(stopSubmit("editProfile", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};


export default profileReducer;
