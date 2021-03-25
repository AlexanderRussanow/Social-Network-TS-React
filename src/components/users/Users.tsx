import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterType, getUsers } from "../../redux/users-Reducers";
import { getCurrentPageSelector, getFollowingInProgressSelector, getPageSizeSelector, getTotalUsersCountSelector, getUsersFilterSelector, getUsersSuper } from "../../redux/usersSelectors";
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";

type PropsType = {
};

export const Users: React.FC<PropsType> = (props) => {

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter));
  }, [])

  const totalItemsCount = useSelector(getTotalUsersCountSelector)
  const currentPage = useSelector(getCurrentPageSelector)
  const pageSize = useSelector(getPageSizeSelector)
  const filter = useSelector(getUsersFilterSelector)
  const users = useSelector(getUsersSuper)
  const followingInProgress = useSelector(getFollowingInProgressSelector)
  const dispatch = useDispatch()
  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter))
  }
  const follow = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      <br></br>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            key={u.id}
            followingInProgress={followingInProgress}
            follow={follow}
            unfollow={unfollow}
          />
        ))}
      </div>
    </div>
  );
};

