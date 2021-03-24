
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum, ResultCodeForCaptchaEnum } from "../api/api";
import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import { BaseThunkType, InferActionsType } from "./redux-store";

export type InitialStateType = typeof initialState;
type AuthReducerActionType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<AuthReducerActionType | FormAction>;

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, // if null - not required
};

const authReducer = (
  state = initialState,
  action: AuthReducerActionType
): InitialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET-USER-DATA":
    case "SN/AUTH/GET-KAPTCHA-URL":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  setUserData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SN/AUTH/SET-USER-DATA",
      payload: { id, email, login, isAuth },
    } as const),
  setCaptchaUrl: (captchaUrl: string) =>
    ({ type: "SN/AUTH/GET-KAPTCHA-URL", payload: { captchaUrl } } as const),
};

// thunkcreator

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me();
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(actions.setUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => async (dispatch) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha);
  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    let message =
      loginData.messages.length > 0 ? loginData.messages[0] : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;

  dispatch(actions.setCaptchaUrl(captchaUrl));
};

export default authReducer;
