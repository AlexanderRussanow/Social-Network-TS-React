import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { UsersType } from './../types/types';



const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const TOTAL_USERS_COUNT = 'TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IN_FOLLOWING_PROGRESS = 'TOGGLE-IN-FOLLOWING-PROGRESS'




let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users Id
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {following: true} )
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {following: false} )

            }

        case SET_USERS:
            return { ...state, users: action.users }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount }

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }

        case TOGGLE_IN_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
};


type FollowSuccessType = {type: typeof FOLLOW, userId: number}
export const followSuccess = (userId: number):FollowSuccessType => ({ type: FOLLOW, userId })

type UnfollowSuccessType = {type: typeof UNFOLLOW, userId: number}
export const unfollowSuccess = (userId: number):UnfollowSuccessType => ({ type: UNFOLLOW, userId })

type SetUsersType = {type: typeof SET_USERS, users: UsersType}
export const setUsers = (users: UsersType):SetUsersType => ({ type: SET_USERS, users })

type SetCurrentPagesType = {type: typeof SET_CURRENT_PAGE, currentPage: number}
export const setCurrentPages = (currentPage: number):SetCurrentPagesType => ({ type: SET_CURRENT_PAGE, currentPage })

type SetTotalUsersCountType = {type: typeof TOTAL_USERS_COUNT, totalUsersCount: number}
export const setTotalUsersCount = (totalUsersCount: number):SetTotalUsersCountType => ({ type: TOTAL_USERS_COUNT, totalUsersCount })

type ToggleIsFetchingtType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const toggleIsFetchingt = (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleInFollowingProgressType = {type: typeof TOGGLE_IN_FOLLOWING_PROGRESS, isFetching: boolean, userId: number }
export const toggleInFollowingProgress = (isFetching: boolean, userId: number) => ({ type: TOGGLE_IN_FOLLOWING_PROGRESS, isFetching, userId })




export const getUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetchingt(true));
        dispatch(setCurrentPages(page))
        let data = await usersAPI
            .getUsers(page, pageSize)

        dispatch(toggleIsFetchingt(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}


const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleInFollowingProgress(true, userId));

    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleInFollowingProgress(false, userId));
}



export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}


export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}


export default usersReducer;
