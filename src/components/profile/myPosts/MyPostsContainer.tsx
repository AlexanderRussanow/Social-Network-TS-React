import React from "react";
import { actions } from "../../../redux/profile-Reducer";
import MyPosts, { MapMyPostsType, DispatchMyPostsType } from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

let mapStateProps = (state: AppStateType) => {
  return {
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText
  }
};


const MyPostsContainer = connect<MapMyPostsType, DispatchMyPostsType, {}, AppStateType>(mapStateProps, { addPost: actions.addPostActionCreator })(MyPosts);

export default MyPostsContainer;
