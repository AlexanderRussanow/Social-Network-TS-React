import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../components/assets/images/user.png";
import { NavLink } from "react-router-dom";
import { UsersType } from "../../types/types";

type UserType = {
  user: UsersType
  followingInProgress: Array<number>
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
}


let User: React.FC<UserType> = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"u.location.city"}</div>
          <div>{"u.location.countrie"}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
