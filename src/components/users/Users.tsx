import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FilterType, getUsers } from "../../redux/users-Reducers";
import {
  getCurrentPageSelector,
  getFollowingInProgressSelector,
  getPageSizeSelector,
  getTotalUsersCountSelector,
  getUsersFilterSelector,
  getUsersSuper,
} from "../../redux/usersSelectors";
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import * as queryString from "querystring";

type PropsType = {};
type QueryParamsType = { term?: string; page?: string; friend?: string };


export const Users: React.FC<PropsType> = (props) => {
  const totalItemsCount = useSelector(getTotalUsersCountSelector);
  const currentPage = useSelector(getCurrentPageSelector);
  const pageSize = useSelector(getPageSizeSelector);
  const filter = useSelector(getUsersFilterSelector);
  const users = useSelector(getUsersSuper);
  const followingInProgress = useSelector(getFollowingInProgressSelector);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const parsed = queryString.parse(
      history.location.search.substr(1)
    ) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);

    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(getUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};

    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/users",
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter));
  };
  const follow = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
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
