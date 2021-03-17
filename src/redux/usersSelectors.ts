import { AppStateType } from './redux-store';
import { createSelector } from 'reselect'

 


export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsersSuper = createSelector (getUsersSelector, (users) => {
    return users.filter( u => true)
}) 





export const getPageSizeSelector = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCountSelector = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageSelector = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getFetchingSelector = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgressSelector = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
