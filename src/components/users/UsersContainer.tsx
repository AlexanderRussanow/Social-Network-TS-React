import React from "react";
import { useSelector } from "react-redux";
import { getFetchingSelector } from "../../redux/usersSelectors";
import Preloader from "../common/preloader/preloader";
import { Users } from "./Users";

type UsersPagePropsType = {
  pageTitle: string;
};

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getFetchingSelector);
  return (
    <div>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </div>
  );
};


// type MapStateToPropsType = {
//   currentPage: number;
//   pageSize: number;
//   isFetching: boolean;
//   totalItemsCount: number;
//   users: Array<UsersType>;
//   followingInProgress: Array<number>;
//   filter: usersReducers.FilterType;
// };

// type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

// type OwnPropsType = {
//   pageTitle: string;
// };


// type MapDispatchToPropsType = {
//   getUsers: (currentPage: number, pageSize: number, filter: usersReducers.FilterType) => void;
//   follow: (userId: number) => void;
//   unfollow: (userId: number) => void;
// };

// class UsersContainer extends React.Component<PropsType> {
//   componentDidMount() {
//     let { currentPage, pageSize, filter } = this.props;
//     this.props.getUsers(currentPage, pageSize, filter);
//   }

//   onPageChanged = (pageNumber: number) => {
//     let { pageSize, filter } = this.props;
//     this.props.getUsers(pageNumber, pageSize, filter);
//   };

//   onFilterChanged = (filter: FilterType) => {
//     let { pageSize } = this.props
//     this.props.getUsers(1, pageSize, filter);
//   }

//   render() {
//     return (
//   <div>
//       <h2>{props.pageTitle}</h2>
//       {isFetching ? <Preloader /> : null}
//       <Users />
//   </div>
// )
//     );
//   }
// }

// let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//   return {
//     users: getUsersSuper(state),
//     pageSize: getPageSizeSelector(state),
//     totalItemsCount: getTotalUsersCountSelector(state),
//     currentPage: getCurrentPageSelector(state),
//     isFetching: getFetchingSelector(state),
//     followingInProgress: getFollowingInProgressSelector(state),
//     filter: getUsersFilterSelector(state)
//   };
// };

// export default compose(
//   connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
//   (mapStateToProps, {
//     follow,
//     unfollow,
//     getUsers
//   })
// )(UsersContainer) ;

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
