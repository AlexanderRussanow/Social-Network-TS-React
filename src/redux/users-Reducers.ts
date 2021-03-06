import { BaseThunkType, InferActionsType } from "./redux-store";
import { usersAPI } from "./../api/usersAPI";
import { updateObjectInArray } from "../utils/object-helpers";
import { UsersType } from "./../types/types";
import { Dispatch } from "redux";
import { ResponseType } from "../api/api";

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>
export type FilterType= typeof initialState.filter

let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, // array of users Id
  filter: {term: "", friend: null as null | boolean }
};

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };

    case "SET_USERS":
      return { ...state, users: action.users };

    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };

    case "TOTAL_USERS_COUNT":
      return { ...state, totalUsersCount: action.totalUsersCount };

    case "TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "TOGGLE_IN_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};



export const actions = {
  followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
  setUsers: (users: Array<UsersType>) =>
    ({ type: "SET_USERS", users } as const),
  setCurrentPages: (currentPage: number) =>
    ({ type: "SET_CURRENT_PAGE", currentPage } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({ type: "TOTAL_USERS_COUNT", totalUsersCount } as const),
  toggleIsFetchingt: (isFetching: boolean) =>
    ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
  toggleInFollowingProgress: (isFetching: boolean, userId: number) =>
    ({ type: "TOGGLE_IN_FOLLOWING_PROGRESS", isFetching, userId } as const),
  setFilter: (filter: FilterType) => ({type: "SET_FILTER", payload: filter} as const)
};



export const getUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetchingt(true));
    dispatch(actions.setCurrentPages(page));
    dispatch(actions.setFilter(filter))
    let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsFetchingt(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: (userID: number) => Promise<ResponseType>,
  actionCreator: (userId: number) => ActionsTypes
  ) => {
  dispatch(actions.toggleInFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleInFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
   await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
  };
};

export default usersReducer;
