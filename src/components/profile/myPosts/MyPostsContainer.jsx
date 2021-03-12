import React from "react";
import { addPostActionCreator } from "../../../redux/profile-Reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

let mapStateProps = (state) => {
  return {
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText
    
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    },
  };
};

const MyPostsContainer = connect(mapStateProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
