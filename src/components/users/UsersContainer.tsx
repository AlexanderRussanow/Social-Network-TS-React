import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import {
  follow,
  unfollow,
  setCurrentPages,
  getUsers,
  toggleInFollowingProgress,
} from "../../redux/users-Reducers";
import Preloader from "../common/preloader/preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getCurrentPageSelector,
  getPageSizeSelector,
  getTotalUsersCountSelector,
  getFollowingInProgressSelector,
  getFetchingSelector,
  getUsersSuper,
} from "../../redux/usersSelectors";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStateToPropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalItemsCount: number;
  users: Array<UsersType>;
  followingInProgress: Array<number>;
}

type MapDispatchToPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
}

type OwnPropsType = {
  pageTitle: string;
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    let { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    let { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalItemsCount={this.props.totalItemsCount}
          pageSize={this.props.pageSize}
          users={this.props.users}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
          // toggleInFollowingProgress={this.props.toggleInFollowingProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: getUsersSuper(state),
    pageSize: getPageSizeSelector(state),
    totalItemsCount: getTotalUsersCountSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getFetchingSelector(state),
    followingInProgress: getFollowingInProgressSelector(state),
  };
};

export default compose(
  withAuthRedirect,
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
  (mapStateToProps, {
    follow,
    unfollow,
    getUsers,
  })
)(UsersContainer);

// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPagesAC(pageNumber))
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountAC(totalCount))
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingtAC(isFetching))
//     }
//   };
// };
