import React from "react";
import { UsersType } from "../../types/types";
import Paginator from "../common/paginator/Paginator";
import User from "./User";

type PropsType = {
  totalItemsCount: number
  pageSize: number 
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UsersType>
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({
  currentPage,
  totalItemsCount,
  pageSize,
  onPageChanged,
  users,
  ...props
}) => {
  return (
    <div>
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
            followingInProgress={props.followingInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
