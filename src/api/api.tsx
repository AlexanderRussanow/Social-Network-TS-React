import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": "5e1e94dd-2abe-4dce-a3f7-967696a4a8f7" },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(userId: number) {
    console.warn("Obsolete method. Please use profileAPI");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};


export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};


type LoginResponseType = {
  data: {userId: number}
  resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
  messages: Array<string>;
}

type LogoutResponseType = {
  resultCode: number
  messages: Array<string>;
  data: object

}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance.post<LoginResponseType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    }).then(res => res.data);
  },
  logout() {
    return instance.delete<LogoutResponseType>(`auth/login`);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};

// export const followAPI = () => {
//   return axios
//     `, {
//       withCredentials: true,
//       headers: { "API-KEY": "5e1e94dd-2abe-4dce-a3f7-967696a4a8f7" },
//     })
//     .then((response) => {
//       return response.data;
//     });
// };

// export const unfollowAPI = () => {
//   axios
//     .post(
//       `${baseURL} + follow/${u.id}`,
//       {},
//       {
//         withCredentials: true,
//         headers: { "API-KEY": "5e1e94dd-2abe-4dce-a3f7-967696a4a8f7" },
//       }
//     )
//     .then((response) => {
//       return response.data;
//     });
// };
