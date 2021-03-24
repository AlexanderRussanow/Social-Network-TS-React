import axios from "axios";
import { UsersType } from "../types/types";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": "5e1e94dd-2abe-4dce-a3f7-967696a4a8f7" },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UsersType>
  totalCount: number
  error: string | null
} 

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
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
