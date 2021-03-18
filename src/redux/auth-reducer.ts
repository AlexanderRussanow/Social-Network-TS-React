// import { login } from './auth-reducer';
// import { connectAdvanced } from "react-redux";
import { stopSubmit } from "redux-form";
import { authAPI, ResultCodesEnum, ResultCodeForCaptchaEnum, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SET-USER-DATA";
const GET_CAPTCHA_URL = "auth/GET-KAPTCHA-URL"

export type InitialStateType = {
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
  captchaUrl: string | null
}

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null // if null - not required
};

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload,
      };
  
    default:
      return state;
  }
};

// actioncreator

type PayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: PayloadType
}

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});



type SetCaptchaUrlActionType = {
  type: typeof GET_CAPTCHA_URL
  payload: {captchaUrl: string}
}

export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({ type: GET_CAPTCHA_URL, payload: {captchaUrl}})

// thunkcreator

export const getAuthUserData = () => async (dispatch: any ) => {
  let meData = await authAPI.me()
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(setUserData(id, email, login, true));
  }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha)
  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else  {
    if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    } 
    let message = loginData.messages.length > 0
        ? loginData.messages[0]
        : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
  }
};


export const getCaptchaUrl = () => async (dispatch: any) => {
  let response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url
  
  dispatch(setCaptchaUrl(captchaUrl))
  
}

export default authReducer;
